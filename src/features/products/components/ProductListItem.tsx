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

const TickIcon = ({ color }: { color: string }) => {
  const tickColor = color === "white" || color === "beige" ? "black" : "white";
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.00035 7.58545L9.59655 2.98926L10.3036 3.69636L5.00035 8.99965L1.81836 5.8177L2.52546 5.1106L5.00035 7.58545Z"
        fill={tickColor}
      />
    </svg>
  );
};

const DiagonalLine = () => {
  return (
    <svg
      width="16"
      height="15"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="15.0002"
        y="-6.10352e-05"
        width="1"
        height="20"
        transform="rotate(45 15.0002 -6.10352e-05)"
        fill="#525252"
      />
    </svg>
  );
};

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

  function getColorClass(color: string) {
    const colorMap: { [key: string]: string } = {
      red: "bg-red-700",
      blue: "bg-blue-700",
      green: "bg-green-700",
      yellow: "bg-yellow-600",
      orange: "bg-orange-600",
      pink: "bg-pink-700",
      purple: "bg-purple-700",
      black: "bg-black",
      white: "bg-white border border-gray-300",
      beige: "bg-amber-100",
      brown: "bg-amber-900",
    };
    return colorMap[color] || "bg-gray-700";
  }

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
