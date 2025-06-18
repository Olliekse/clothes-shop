import { useState } from "react";

interface SizesProps {
  sizes: (string | null)[];
  onSizeSelect?: (size: string) => void;
  selectedSize?: string | null;
}

function Sizes({
  sizes,
  onSizeSelect,
  selectedSize: externalSelectedSize,
}: SizesProps) {
  const [internalSelectedSize, setInternalSelectedSize] = useState<
    string | null
  >(null);

  // Use external or internal state based on whether onSizeSelect is provided
  const selectedSize = externalSelectedSize ?? internalSelectedSize;

  // Define the order of sizes
  const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  // Size mapping for normalization
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

  // Normalize and filter sizes
  const validSizes = sizes
    .filter((size): size is string => size !== null)
    .map((size) => {
      const normalizedSize = String(size).toLowerCase().trim();
      return sizeMap[normalizedSize] || normalizedSize.toUpperCase();
    });

  // Sort sizes based on the predefined order
  const sortedSizes = validSizes.sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a);
    const bIndex = sizeOrder.indexOf(b);

    // If both sizes are in our predefined order, sort by that
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }

    // If only one size is in our predefined order, prioritize it
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    // If neither size is in our predefined order, sort alphabetically
    return a.localeCompare(b);
  });

  const handleSizeClick = (size: string) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    } else {
      setInternalSelectedSize(size);
    }
  };

  return (
    <>
      <p className="text-sm text-neutral-500 pb-[16px]">Available sizes</p>
      <div className="flex gap-[16px] flex-wrap">
        {sortedSizes.map((size) => (
          <div
            key={size}
            className={`cursor-pointer w-16 flex justify-center items-center gap-1.5 bg-white px-5 py-[11.4px] rounded border border-solid border-neutral-200 ${
              selectedSize === size
                ? "ring-[1.5px] ring-blue-500 ring-offset-1 relative"
                : "focus:ring-4 focus:ring-blue-100"
            }`}
            onClick={() => handleSizeClick(size)}
          >
            {size.startsWith("X") ? size : size.slice(0, 1)}
          </div>
        ))}
      </div>
    </>
  );
}

export default Sizes;
