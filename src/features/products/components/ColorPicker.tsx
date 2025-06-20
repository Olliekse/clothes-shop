import { useEffect } from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  inventoryItems?: { color: string; stock: number }[];
  size?: "sm" | "lg";
  gap?: "sm" | "lg";
}

const TickIcon = ({ color, size }: { color: string; size: "sm" | "lg" }) => {
  const tickColor = color === "white" || color === "beige" ? "black" : "white";
  const dimensions =
    size === "sm"
      ? { width: "12", height: "14" }
      : { width: "24", height: "24" };
  return (
    <svg
      {...dimensions}
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

const DiagonalLine = ({ size }: { size: "sm" | "lg" }) => {
  const dimensions =
    size === "sm"
      ? { width: "14", height: "16" }
      : { width: "40", height: "40" };
  return (
    <svg
      {...dimensions}
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
  size = "sm",
  gap = "lg",
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

  const sizeClasses = {
    sm: "w-[16px] h-[16px]",
    lg: "w-[38px] h-[38px]",
  };

  const gapClasses = {
    sm: "gap-[12px]",
    lg: "gap-[35px]",
  };

  return (
    <>
      <p className="text-sm text-neutral-500 pb-[25px] min-[768px]:pb-[26px]">
        Available Colors
      </p>
      <div
        className={`${gapClasses[gap]} flex pb-[41px] min-[1440px]:pl-[10px] min-[768px]:pl-[10px] pl-[8px]`}
        role="group"
        aria-label="Color selection"
      >
        {colors.map((color) => {
          const colorInventory = inventoryItems.filter(
            (item) => item.color === color
          );
          const isOutOfStock =
            colorInventory.length > 0 &&
            colorInventory.every((item) => item.stock === 0);

          return (
            <button
              key={color}
              onClick={() => onColorSelect(color)}
              className={`relative hover:ring-[0.5px] rounded-[50%] outline-none ${getColorClass(color)} ${sizeClasses[size]}
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
                <div
                  className={`absolute ${
                    size === "sm"
                      ? "top-[0] left-[1px]"
                      : "top-[-1px] left-[-2px]"
                  }`}
                >
                  <DiagonalLine size={size} />
                </div>
              )}

              {selectedColor === color && !isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <TickIcon color={color} size={size} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default ColorPicker;
