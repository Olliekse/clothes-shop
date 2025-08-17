import React, { useMemo } from "react";

interface ColorPickerProps {
  colors: string[];
  selectedColor: string | null;
  onColorSelect: (color: string) => void;
  inventoryItems?: { color: string; stock: number }[];
  size?: "sm" | "lg";
  gap?: "sm" | "lg";
  hideHeading?: boolean;
  multiSelect?: boolean;
  selectedColors?: string[];
}

const TickIcon = React.memo(
  ({ color, size }: { color: string; size: "sm" | "lg" }) => {
    const tickColor =
      color === "white" || color === "beige" ? "black" : "white";
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
  }
);

const DiagonalLine = React.memo(({ size }: { size: "sm" | "lg" }) => {
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
});

interface ColorButtonProps {
  color: string;
  selected: boolean;
  outOfStock: boolean;
  size: "sm" | "lg";
  onSelect: (color: string) => void;
}

const colorClassMap: Record<string, string> = {
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

const sizeClasses = {
  sm: "w-4 h-4",
  lg: "w-10 h-10",
};

const ColorButton = React.memo(function ColorButton({
  color,
  selected,
  outOfStock,
  size,
  onSelect,
}: ColorButtonProps) {
  return (
    <button
      onClick={() => onSelect(color)}
      className={`relative hover:ring-[0.5px] rounded-[50%] outline-none 
        ${colorClassMap[color] || "bg-gray-700"} 
        ${sizeClasses[size]}
        ${selected ? "ring-2 ring-blue-500 ring-offset-1" : "focus:ring-4 focus:ring-blue-100"}`}
      aria-label={`Select ${color} color`}
      aria-pressed={selected}
      aria-disabled={outOfStock}
      role="radio"
      aria-checked={selected}
    >
      {outOfStock && (
        <div
          className={`absolute ${
            size === "sm" ? "top-[0] left-[1px]" : "top-[-1px] left-[-2px]"
          }`}
        >
          <DiagonalLine size={size} />
        </div>
      )}

      {selected && !outOfStock && (
        <div className="absolute inset-0 flex items-center justify-center">
          <TickIcon color={color} size={size} />
        </div>
      )}
    </button>
  );
});

const gapClasses = {
  sm: "gap-3",
  lg: "gap-9",
};

function ColorPicker({
  colors,
  selectedColor,
  onColorSelect,
  inventoryItems = [],
  size = "sm",
  gap = "lg",
  hideHeading = false,
  multiSelect = false,
  selectedColors = [],
}: ColorPickerProps) {
  const stockMap = useMemo(() => {
    const map = new Map<string, number[]>();
    inventoryItems.forEach(({ color, stock }) => {
      if (!map.has(color)) map.set(color, []);
      map.get(color)!.push(stock);
    });
    return map;
  }, [inventoryItems]);

  return (
    <>
      {!hideHeading && (
        <p className="text-sm text-neutral-500 pb-[25px] md:pb-[26px]">
          Available Colors
        </p>
      )}
      <div
        className={`${gapClasses[gap]} flex flex-wrap pb-[41px] pt-1 xl:pl-[10px] md:pl-[10px] pl-[8px]`}
        role="group"
        aria-label="Color selection"
      >
        {colors.map((color) => {
          const stockArray = stockMap.get(color) || [];
          const outOfStock =
            stockArray.length > 0 && stockArray.every((s) => s === 0);

          const isSelected = multiSelect
            ? selectedColors.includes(color)
            : selectedColor === color;

          return (
            <ColorButton
              key={color}
              color={color}
              selected={isSelected}
              outOfStock={outOfStock}
              size={size}
              onSelect={onColorSelect}
            />
          );
        })}
      </div>
    </>
  );
}

export default React.memo(ColorPicker);
