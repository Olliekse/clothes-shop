import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: string;
  disabled?: boolean;
}

function Button({ type, children, disabled }: ButtonProps) {
  if (type === "viewAll") {
    return (
      <button
        className="disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border-[0.5px] border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-4 focus:outline-offset-1 focus:outline-purple-200"
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  if (type === "addToCart") {
    return (
      <button
        className="w-full flex justify-center items-center gap-2.5 bg-indigo-700 px-6 py-3 rounded text-white min-[768px]:py-4 font-medium text-md min-[768px]:text-lg disabled:bg-neutral-100 disabled:text-neutral-400"
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return null;
}

export default Button;
