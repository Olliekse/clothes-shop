import { useState, useEffect } from "react";

interface QuantityProps {
  disabled?: boolean;
  stock?: number;
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

function Quantity({
  disabled = false,
  stock,
  initialQuantity = 0,
  onQuantityChange,
}: QuantityProps) {
  const [count, setCount] = useState(initialQuantity);
  const [showTooltip, setShowTooltip] = useState(false);

  // Update internal state when initialQuantity prop changes
  useEffect(() => {
    setCount(initialQuantity);
  }, [initialQuantity]);

  function handleDecrement(): void {
    if (count > 0 && !disabled) {
      const newCount = count - 1;
      setCount(newCount);
      onQuantityChange?.(newCount);
    }
    setShowTooltip(false);
  }

  function handleIncrement(): void {
    if (!disabled && (!stock || count < stock)) {
      const newCount = count + 1;
      setCount(newCount);
      onQuantityChange?.(newCount);
      setShowTooltip(false);
    } else if (stock && count >= stock) {
      setShowTooltip(true);
    }
  }

  return (
    <div>
      <div className="relative h-9 px-3 justify-between w-32 flex items-center bg-neutral-50 p-0.5 rounded-md border border-solid border-neutral-200">
        <button
          onClick={handleDecrement}
          disabled={disabled}
          className={`${disabled ? "text-neutral-300 cursor-not-allowed" : "text-neutral-900 hover:text-neutral-600"} transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1`}
        >
          –
        </button>
        <span className={disabled ? "text-neutral-300" : "text-neutral-900"}>
          {count}
        </span>
        <button
          onClick={handleIncrement}
          disabled={disabled}
          className={`${disabled ? "text-neutral-300 cursor-not-allowed" : "text-neutral-900 hover:text-neutral-600"} transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1`}
        >
          +
        </button>
        {showTooltip && (
          <div className="z-1 absolute w-32 left-12 -translate-y-20 top-12">
            <div className="relative">
              <div className="px-3 py-2 bg-neutral-950 text-white text-xs rounded-lg shadow">
                Insufficient stock
              </div>
              <svg
                className="absolute left-14 top-8"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5711 0.485289C14.462 0.485289 14.9081 1.56243 14.2782 2.1924L8.20711 8.26347C7.81658 8.654 7.18342 8.654 6.79289 8.26347L0.721832 2.1924C0.0918675 1.56243 0.538034 0.485289 1.42894 0.485289L13.5711 0.485289Z"
                  fill="#0A0A0A"
                />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quantity;
