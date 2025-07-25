import React, { useMemo, useState } from "react";

interface SizesProps {
  sizes: (string | null)[];
  onSizeSelect?: (size: string) => void;
  selectedSize?: string | null;
  inventory?: Array<{ size: string | null; stock: number }>;
}

function Sizes({
  sizes,
  onSizeSelect,
  selectedSize: externalSelectedSize,
  inventory,
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
  const validSizes = useMemo(() => {
    return sizes
      .filter((size): size is string => size !== null)
      .map((size) => {
        const normalizedSize = String(size).toLowerCase().trim();
        return sizeMap[normalizedSize] || normalizedSize.toUpperCase();
      });
  }, [sizeMap, sizes]);

  const sortedSizes = useMemo(() => {
    if (validSizes.every((s) => !isNaN(Number(s)))) {
      return validSizes.slice().sort((a, b) => Number(a) - Number(b));
    } else {
      return validSizes.slice().sort((a, b) => {
        const aIndex = sizeOrder.indexOf(a);
        const bIndex = sizeOrder.indexOf(b);

        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex;
        }
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return a.localeCompare(b);
      });
    }
  }, [validSizes, sizeOrder]);

  const handleSizeClick = (size: string) => {
    if (onSizeSelect) {
      onSizeSelect(size);
    } else {
      setInternalSelectedSize(size);
    }
  };

  const isSizeOutOfStock = (size: string) => {
    if (!inventory) return false;

    const normalizedSize =
      sizeMap[size.toLowerCase().trim()] || size.toUpperCase();
    const item = inventory.find((inv) => {
      if (!inv.size) return false;
      const invNormalized =
        sizeMap[inv.size.toLowerCase().trim()] || inv.size.toUpperCase();
      return invNormalized === normalizedSize;
    });
    return !item || item.stock === 0;
  };

  const allOutOfStock =
    inventory && inventory.length > 0
      ? inventory.every((inv) => inv.stock === 0)
      : false;

  return (
    <>
      <p className="text-sm text-neutral-500 pb-[16px]">Available sizes</p>
      {allOutOfStock && (
        <div className="text-black pb-2">Sorry, this item is out of stock</div>
      )}
      <div className="flex gap-4 flex-wrap">
        {sortedSizes.map((size) => (
          <div
            key={size}
            className={`w-16 flex justify-center items-center gap-1.5 px-5 py-3 rounded border border-solid border-neutral-200
              ${isSizeOutOfStock(size) ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white cursor-pointer"}
              ${selectedSize === size ? "ring-2 ring-blue-500 ring-offset-1 relative" : "focus:ring-4 focus:ring-blue-100"}
            `}
            onClick={() => !isSizeOutOfStock(size) && handleSizeClick(size)}
            aria-disabled={isSizeOutOfStock(size)}
          >
            {size.startsWith("X") ? size : size}
          </div>
        ))}
      </div>
    </>
  );
}

export default React.memo(Sizes);
