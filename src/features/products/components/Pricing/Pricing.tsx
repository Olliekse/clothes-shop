import React from "react";

interface PricingProps {
  price: number;
  discount?: number;
}

function Pricing({ price, discount = 0 }: PricingProps) {
  const discountedPrice = price - (price * discount) / 100;
  const hasDiscount = discount > 0;

  return (
    <>
      <div className="flex gap-2 items-center">
        <p className="font-medium text-3xl text-neutral-600 mb-[8px]">
          ${discountedPrice}
        </p>
        {hasDiscount && (
          <span className="line-through font-medium text-lg text-neutral-400">
            ${price}
          </span>
        )}
      </div>
      {hasDiscount && (
        <span className="text-sm text-amber-700 w-20 bg-amber-50 px-2 py-1 rounded-full border border-solid border-amber-200">
          {discount}% OFF
        </span>
      )}
    </>
  );
}

export default React.memo(Pricing);
