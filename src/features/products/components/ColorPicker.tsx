interface ColorPickerProps {
  colors: string[];
}

function ColorPicker({ colors }: ColorPickerProps) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    red: "bg-red-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    black: "bg-black",
    white: "bg-white border border-gray-300",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
    brown: "bg-amber-700",
    beige: "bg-amber-100",
  };

  return (
    <div className="pb-[32px]">
      <p className="text-sm text-neutral-500 pb-[16px]">Available Colors</p>
      <div className="flex flex-row gap-[34px]">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-[38px] h-[38px] rounded-full ${colorMap[color.toLowerCase()] || "bg-gray-300"}`}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
