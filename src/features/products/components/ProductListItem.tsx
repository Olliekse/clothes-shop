import { useState } from "react";
import { capitalizeFirstLetter } from "../utils/productHelpers";
import { Link } from "react-router";
import ColorPicker from "./ColorPicker";

interface Product {
  product_id: string;
  name: string;
}

interface ProductImage {
  product_id: string;
  color: string;
  image_url: string;
}

interface InventoryItem {
  color: string;
  list_price: number;
  stock: number;
  discount_percentage: number;
}

function ProductListItem({
  product,
  productImage,
  inventoryItems,
  productImages,
}: {
  product: Product;
  productImage: ProductImage;
  inventoryItems: InventoryItem[];
  productImages: ProductImage[];
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const uniqueColors = [
    ...new Set(
      productImages
        .filter((img) => img.product_id === product.product_id)
        .map((img) => img.color)
    ),
  ];

  const defaultInventoryItem = inventoryItems[0];

  return (
    <div className="mb-[32px]" key={product.product_id}>
      <Link to={`/product/${product.product_id}`}>
        <img
          className="cursor-pointer rounded-lg w-[319px] object-cover h-[300px] md:w-[336px] lg:w-[280px]"
          src={productImage.image_url}
          alt={product.name}
        />
      </Link>

      <div className="mt-[16px] mx-0">
        <p className="text-sm text-neutral-600">
          {capitalizeFirstLetter(defaultInventoryItem.color)}
        </p>
        <Link to={`/product/${product.product_id}`}>
          <span className="cursor-pointer text-3xl min-[1440px]:font-medium min-[1440px]:text-lg">
            {product.name}
          </span>
        </Link>
        <div
          className="flex items-center gap-[8px] mt-[12px]"
          aria-label="Price information"
        >
          <p className="text-lg text-neutral-500">
            $
            {defaultInventoryItem.list_price -
              (defaultInventoryItem.list_price / 100) *
                defaultInventoryItem.discount_percentage}
          </p>
          {defaultInventoryItem.discount_percentage && (
            <p className="text-xs line-through text-neutral-600 align-bottom">
              ${defaultInventoryItem.list_price}
            </p>
          )}
        </div>
        <div className="pt-[16px] pb-[34px]">
          <ColorPicker
            colors={uniqueColors}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            inventoryItems={inventoryItems}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
