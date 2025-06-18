import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type: string;
}

function Button({ type, children }: ButtonProps) {
  if (type === "viewAll") {
    return (
      <button className="disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border-[0.5px] border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-4 focus:outline-offset-1 focus:outline-purple-200">
        {children}
      </button>
    );
  }

  if (type === "addToCart") {
    return (
      <button className="w-full flex justify-center items-center gap-2.5 bg-indigo-700 px-6 py-3 rounded text-white min-[768px]:py-4 font-medium text-md min-[768px]:text-lg">
        {children}
      </button>
    );
  }

  return null;
}

export default Button;
