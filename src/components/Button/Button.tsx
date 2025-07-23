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

  if (type === "shopNow") {
    return (
      <button
        className="w-1/2 md:w-[27%] xl:w-[175px] flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:pt-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8 md:mt-16"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "addToCart") {
    return (
      <button
        className="w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "Checkout") {
    return (
      <button
        className="w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8 md:mt-0"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }

  if (type === "Subscribe") {
    return (
      <button
        className="w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md disabled:bg-neutral-100 disabled:text-neutral-400 md:mt-0 md:text-sm xl:mb-[24px] md:w-[98px] md:h-[40px]"
        disabled={disabled}
        onClick={onClick}
        type="submit"
      >
        {children}
      </button>
    );
  }

  if (type === "explore") {
    return (
      <button
        className="w-48 flex justify-center items-center gap-2 md:gap-3 bg-indigo-700 py-3 px-5 rounded text-white font-medium disabled:bg-neutral-100 disabled:text-neutral-400"
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
        className="disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center bg-white px-5 rounded border border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-4 focus:outline-offset-1 focus:outline-purple-200"
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
