import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";

import { useCartStore } from "../../../../store/cartStore";
import { dataService } from "../../../../api/dataService";

import ImageGrid from "../ImageGrid";
import Pricing from "../Pricing";
import StarRating from "../../../../components/StarRating";
import ColorPicker from "../../../../components/ColorPicker";
import Sizes from "../Sizes";
import Quantity from "../../../../components/Quantity";
import Button from "../../../../components/Button";
import Description from "../Description";

interface Product {
  product_id: string;
  name: string;
  description: string;
  category: string;
  collection: string;
  created_at: string;
  images: Array<{
    product_id: string;
    color: string;
    image_url: string;
  }>;
  inventory: Array<{
    product_id: string;
    sku: string;
    color: string;
    size: string | null;
    list_price: number;
    discount: number | null;
    discount_percentage: number | null;
    sale_price: number;
    sold: number;
    stock: number;
  }>;
}

function ProductDetails() {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { addToCart } = useCartStore();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const product = dataService.getProductById(id);
      if (!product) throw new Error("Product not found");
      return product;
    },
  });

  const productColors = useMemo(() => {
    return product ? dataService.getProductColors(product.product_id) : [];
  }, [product]);

  const productInventory = useMemo(() => {
    return product ? product.inventory : [];
  }, [product]);

  const productSizes = useMemo(() => {
    return product ? dataService.getProductSizes(product.product_id) : [];
  }, [product]);

  const productRating = useMemo(() => {
    return product
      ? dataService.getProductAverageRating(product.product_id)
      : 0;
  }, [product]);

  const productReviewCount = useMemo(() => {
    return product ? dataService.getProductReviewCount(product.product_id) : 0;
  }, [product]);

  useEffect(() => {
    if (!selectedColor && productColors.length > 0) {
      setSelectedColor(productColors[0]);
    }
  }, [selectedColor, productColors]);

  useEffect(() => {
    if (product && selectedColor && productInventory.length > 0) {
      const availableSizes = productInventory
        .filter((item) => item.color === selectedColor)
        .map((item) => item.size)
        .filter((size, idx, arr) => size && arr.indexOf(size) === idx);

      if (!selectedSize && availableSizes.length > 0) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [product, selectedColor, selectedSize, productInventory]);

  const sizeMap: { [key: string]: string } = {
    xs: "XS",
    sm: "S",
    md: "M",
    lg: "L",
    xl: "XL",
    xxs: "XXS",
    xxl: "XXL",
    xxxl: "XXXL",
  };

  function normalizeSize(size: string | null) {
    if (!size) return null;
    const normalized = size.toLowerCase().trim();
    return sizeMap[normalized] || size.toUpperCase();
  }

  const selectedInventory = useMemo(() => {
    return product && productInventory
      ? productInventory
          .filter((item) => item.color === selectedColor)
          .map((item) => ({
            ...item,
            size: item.size ? normalizeSize(item.size) : null,
          }))
      : [];
  }, [product, selectedColor, productInventory]);

  useEffect(() => {
    if (selectedInventory.length > 0 && !selectedSize) {
      const availableSizes = selectedInventory
        .filter((item) => item.stock > 0)
        .map((item) => normalizeSize(item.size))
        .filter((size, idx, arr) => size && arr.indexOf(size) === idx);

      if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0]);
      }
    }
  }, [selectedInventory, selectedSize]);

  const normalizedSelectedSize = normalizeSize(selectedSize);

  const stockLevel = useMemo(() => {
    return (
      selectedInventory.find(
        (item) => normalizeSize(item.size) === normalizedSelectedSize
      )?.stock ?? 0
    );
  }, [selectedInventory, normalizedSelectedSize]);

  const isFullyOutOfStock = useMemo(() => {
    return (
      selectedInventory.length > 0 &&
      selectedInventory.every((item) => item.stock === 0)
    );
  }, [selectedInventory]);

  const selectedInventoryItem = selectedInventory.find(
    (item) => normalizeSize(item.size) === normalizedSelectedSize
  );

  const selectedImage = product
    ? product.images.find((img) => img.color === selectedColor)?.image_url ||
      product.images[0]?.image_url
    : undefined;

  const handleAddToCart = () => {
    if (!product || !selectedInventoryItem || quantity <= 0 || !selectedImage) {
      return;
    }

    const cartItem = {
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      price:
        selectedInventoryItem.sale_price || selectedInventoryItem.list_price,
      quantity: quantity,
      color: selectedColor ? String(selectedColor) : "",
      size: selectedSize ? String(selectedSize) : "",
      image: selectedImage,
      discount:
        selectedInventoryItem.discount_percentage ??
        selectedInventoryItem.discount ??
        0,
    };

    addToCart(cartItem);
  };

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const defaultInventoryItem = product.inventory[0];

  return (
    <div className="min-[375px]:w-[100%] min-[1440px]:w-[1280px] min-[1440px]:grid min-[1440px]:grid-cols-[592px_592px] min-[1440px]:px-[96px] min-[1440px]:gap-[32px]">
      <ImageGrid images={product.images} selectedColor={selectedColor} />
      <div className="min-[1440px]:py-[96px] min-[375px]:px-[16px] min-[1440px]:p-0">
        <h1 className="font-semibold text-3xl text-neutral-900 pb-[20px] min-[768px]:text-font-semibold min-[768px]:text-5xl min-[1440px]:pt-[0]">
          {product.name}
        </h1>
        <Pricing
          price={defaultInventoryItem.list_price}
          discount={defaultInventoryItem.discount_percentage || 0}
        />
        <StarRating rating={productRating} reviewCount={productReviewCount} />
        <p className="text-neutral-600 pb-[32px]">{product.description}</p>
        <ColorPicker
          colors={productColors}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          inventoryItems={productInventory}
          size="lg"
          gap="lg"
        />
        <Sizes
          sizes={productSizes}
          onSizeSelect={setSelectedSize}
          selectedSize={normalizedSelectedSize}
          inventory={selectedInventory}
        />
        <p className="pt-[32px] pb-[16px] text-sm text-neutral-500">Quantity</p>
        <Quantity
          disabled={isFullyOutOfStock}
          stock={stockLevel}
          onQuantityChange={setQuantity}
        />
        <Button
          onClick={handleAddToCart}
          type="addToCartCheckout"
          disabled={isFullyOutOfStock}
        >
          Add to Cart
        </Button>
        <Description productId={product.product_id} />
      </div>
    </div>
  );
}

export default ProductDetails;
