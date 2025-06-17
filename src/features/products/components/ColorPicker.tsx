import { useState } from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  inventoryItems?: { color: string; stock: number }[];
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

function ColorPicker({
  colors,
  selectedColor,
  onColorSelect,
  inventoryItems = [],
}: ColorPickerProps) {
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

  return (
    <div className="flex gap-[8px]" role="group" aria-label="Color selection">
      {colors.map((color) => {
        const colorInventoryItem = inventoryItems.find(
          (item) => item.color === color
        );
        const isOutOfStock = colorInventoryItem?.stock === 0;

        return (
          <button
            key={color}
            onClick={() => !isOutOfStock && onColorSelect(color)}
            className={`relative hover:ring-[0.5px] w-[16px] h-[16px] rounded-[50%] outline-none ${getColorClass(color)} 
              ${
                selectedColor === color
                  ? "ring-[1.5px] ring-blue-500 ring-offset-1 relative"
                  : "focus:ring-4 focus:ring-blue-100"
              }
              }`}
            aria-label={`Select ${color} color`}
            aria-pressed={selectedColor === color}
            aria-disabled={isOutOfStock}
            role="radio"
            aria-checked={selectedColor === color}
          >
            {isOutOfStock && (
              <div className="absolute top-[0.9px] left-[0.2px]">
                <DiagonalLine />
              </div>
            )}

            {selectedColor === color && !isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center">
                <TickIcon color={color} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ColorPicker;
