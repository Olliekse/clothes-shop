import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { dataService } from "../../../api/dataService";

import ImageGrid from "./ImageGrid";
import Pricing from "./Pricing";
import StarRating from "../../../components/StarRating";
import ColorPicker from "./ColorPicker";
import Sizes from "./Sizes";
import Quantity from "./Quantity";
import Button from "../../../components/Button";
import Description from "./Description";

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

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Product ID is required");
      const product = dataService.getProductById(id);
      if (!product) throw new Error("Product not found");
      return product;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const defaultInventoryItem = product.inventory[0];

  return (
    <div className="min-[375px]:w-[100%] min-[1440px]:w-[1280px] min-[375px]:py-[16px] min-[375px]:px-[16px] min-[768px]:py-[16px] min-[768px]:px-[32px] min-[1440px]:grid min-[1440px]:grid-cols-2">
      <ImageGrid images={product.images} />
      <div className="min-[1440px]:pl-[32px] min-[1440px]:py-[96px] min-[375px]:px-[16px]">
        <h1 className="font-semibold text-3xl text-neutral-900 pb-[20px] min-[1440px]:text-font-semibold min-[1440px]:text-5xl min-[1440px]:pt-[0]">
          {product.name}
        </h1>
        <Pricing
          price={defaultInventoryItem.list_price}
          discount={defaultInventoryItem.discount_percentage || 0}
        />
        <StarRating
          rating={dataService.getProductAverageRating(product.product_id)}
          reviewCount={dataService.getProductReviewCount(product.product_id)}
        />
        <p className="text-neutral-600 pb-[32px]">{product.description}</p>
        <ColorPicker
          colors={dataService.getProductColors(product.product_id)}
        />
        <Sizes sizes={dataService.getProductSizes(product.product_id)} />
        <Quantity />
        <Button type="addToCart">Add to cart</Button>
        <Description />
      </div>
    </div>
  );
}

export default ProductDetails;
