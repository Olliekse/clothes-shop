import React from "react";
import ColorPicker from "../../../../components/ColorPicker";

interface FilterMenuContentProps {
  onClose: (() => void) | null;
  selectedColors: string[];
  onColorChange: (color: string) => void;
  onClearColors: () => void;
  colors: string[];
}

export const FilterMenuContent: React.FC<FilterMenuContentProps> = ({
  onClose,
  selectedColors,
  onColorChange,
  onClearColors,
  colors,
}) => {
  return (
    <>
      <div className="text-xl flex justify-between text-neutral-900 pb-6 mb-6 border-b border-neutral-300 w-full">
        <span>Filter</span>
        {onClose && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="self-center cursor-pointer"
            onClick={onClose}
          >
            <path
              d="M6.00058 4.82208L10.1253 0.697266L11.3038 1.87577L7.17908 6.00058L11.3038 10.1253L10.1253 11.3038L6.00058 7.17908L1.87577 11.3038L0.697266 10.1253L4.82208 6.00058L0.697266 1.87577L1.87577 0.697266L6.00058 4.82208Z"
              fill="#525252"
            />
          </svg>
        )}
      </div>

      <div className="">
        <p className="font-medium text-base text-neutral-900 flex justify-between pb-6">
          Collections
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="self-center"
          >
            <path
              d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
              fill="#525252"
            />
          </svg>
        </p>
        <div className="flex flex-col gap-4 text-base text-neutral-600 pb-6 mb-6 border-b border-neutral-300 w-full">
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Latest arrivals</p>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Urban Oasis</p>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Cozy Comfort</p>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Fresh Fusion</p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-base text-neutral-900 flex justify-between pb-6">
          Category
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="self-center"
          >
            <path
              d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
              fill="#525252"
            />
          </svg>
        </p>
        <div className="flex flex-col gap-4 text-base text-neutral-600 pb-6 mb-6 border-b border-neutral-300 w-full">
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Unisex</p>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Women</p>
          </div>
          <div className="flex gap-3">
            <input type="checkbox" className="accent-indigo-600" />
            <p>Men</p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-medium text-base text-neutral-900 flex justify-between pb-6">
          Colors
          {selectedColors.length > 0 && (
            <span className="text-sm text-neutral-500">
              ({selectedColors.length} selected)
            </span>
          )}
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="self-center"
          >
            <path
              d="M11.8334 0.166687H0.166748V1.83335H11.8334V0.166687Z"
              fill="#525252"
            />
          </svg>
        </p>
        <ColorPicker
          colors={colors}
          selectedColor={null}
          onColorSelect={onColorChange}
          size="sm"
          gap="sm"
          hideHeading={true}
          multiSelect={true}
          selectedColors={selectedColors}
        />
        {selectedColors.length > 0 && (
          <button
            onClick={onClearColors}
            className="text-sm text-neutral-500 hover:text-neutral-700 underline mt-2"
          >
            Clear all colors
          </button>
        )}
      </div>
    </>
  );
};
