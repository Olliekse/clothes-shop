import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: string;
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ type, children, disabled, onClick }: ButtonProps) {
  if (type === "viewAll") {
    return (
      <button
        className="disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border-[0.5px] border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-4 focus:outline-offset-1 focus:outline-purple-200"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "addToCartCheckout") {
    return (
      <button
        className="w-full flex justify-center items-center gap-2.5 bg-indigo-700 px-6 py-3 rounded text-white min-[768px]:py-4 font-medium text-md min-[768px]:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-[32px] min-[768px]:mt-0"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "explore") {
    return (
      <button
        className="w-[192px] flex justify-center items-center gap-[8px] min-[768px]:gap-[13px] bg-indigo-700 py-[12px] px-[18px] rounded text-white font-medium disabled:bg-neutral-100 disabled:text-neutral-400"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "apply") {
    return (
      <button
        className="disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center bg-white px-[21px] rounded border-[0.5px] border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-4 focus:outline-offset-1 focus:outline-purple-200"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  return null;
}

export default Button;
