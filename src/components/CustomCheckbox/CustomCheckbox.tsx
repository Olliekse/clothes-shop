import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  className = "",
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <div className="relative p-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div
          className={`
            w-4 h-4 border-2 border-neutral-300 rounded
            flex items-center justify-center
            transition-all duration-200
            peer-focus-visible:border-blue-500 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30
            ${
              checked
                ? "bg-indigo-600 border-indigo-600"
                : "bg-white border-neutral-300"
            }
            hover:border-neutral-400
          `}
        >
          {checked && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      {label && <span className="text-neutral-700">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
