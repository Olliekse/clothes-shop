import { memo, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type:
    | "viewAll"
    | "shopNow"
    | "addToCart"
    | "checkout"
    | "subscribe"
    | "explore"
    | "apply";
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const classes: Record<ButtonProps["type"], string> = {
  viewAll:
    "disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center gap-1.5 bg-white px-4 py-2.5 rounded border-[0.5px] border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  shopNow:
    "w-1/2 md:w-[27%] xl:w-[175px] flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:pt-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8 md:mt-16 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  addToCart:
    "w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  checkout:
    "w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md md:text-lg disabled:bg-neutral-100 disabled:text-neutral-400 mt-8 md:mt-0 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  subscribe:
    "w-full flex justify-center items-center gap-2 bg-indigo-700 px-6 py-3 rounded text-white md:py-4 font-medium text-md disabled:bg-neutral-100 disabled:text-neutral-400 md:mt-0 md:text-sm xl:mb-[24px] md:w-[98px] md:h-[40px] focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  explore:
    "w-48 flex justify-center items-center gap-2 md:gap-3 bg-indigo-700 py-3 px-5 rounded text-white font-medium disabled:bg-neutral-100 disabled:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
  apply:
    "disabled:bg-neutral-100 disabled:text-neutral-400 flex justify-center items-center bg-white px-5 rounded border border-solid shadow-md hover:bg-neutral-50 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1",
};

function Button({ type, children, disabled, onClick }: ButtonProps) {
  const className = classes[type];
  const isSubmit = type === "subscribe";

  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default memo(Button);
