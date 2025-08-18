import { useRef, useState } from "react";
import { useCartStore } from "../../store/cartStore";
import {
  capitalizeFirstLetter,
  formatPrice,
} from "../../features/products/utils/productHelpers";
import Button from "../Button";
import { useNavigate } from "react-router";

type OrderSummaryProps = {
  variant: "cart" | "checkout" | "order-confirmation";
};

function OrderSummary({ variant }: OrderSummaryProps) {
  const [couponShow, setCouponShow] = useState(false);
  const { couponCode, setCouponCode } = useCartStore();
  const navigate = useNavigate();
  const { items } = useCartStore();

  const couponField = useRef<HTMLInputElement>(null);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.price;
    const discount = item.discount || 0;

    const discountedPrice = itemPrice - (itemPrice * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const coupon = couponCode ? 5 : 0;
  const total = subtotal - coupon;

  return (
    <div
      className={`${variant !== "order-confirmation" ? "border border-solid border-neutral-200 rounded-lg py-[16px] px-[16px]" : "md:px-0"} mt-8 lg:mt-0  md:p-[32px] lg:flex lg:flex-col lg:justify-between`}
    >
      <div>
        {variant !== "order-confirmation" && (
          <h2
            className={`font-semibold text-neutral-900 pb-[32px] ${variant === "checkout" ? "text-xl" : "text-2xl"}`}
          >
            Order Summary
          </h2>
        )}
        {(variant === "checkout" || variant === "order-confirmation") && (
          <div className="flex flex-col">
            {items.map((item) => (
              <div
                key={`${item.name} - ${item.size}`}
                className={`${
                  variant === "checkout"
                    ? "flex flex-row gap-6 border-b-[1px] border-dashed border-neutral-200 last-of-type:border-solid pb-8 pt-8 first-of-type:pt-0"
                    : "grid grid-cols-3 md:flex md:flex-row md:gap-6 border-b border-dashed pb-8 mb-8"
                }`}
              >
                <img
                  className={`object-cover flex-shrink-0 ${variant === "order-confirmation" ? "w-[80px] h-[80px]" : "w-[56px] h-[56px]"} rounded-lg md:w-[80px] md:h-[80px]`}
                  src={item.image}
                />
                <div className="lg:flex lg:justify-between w-[190px] md:w-full">
                  <div
                    className={`${variant === "order-confirmation" ? "grid grid-cols-[auto_auto] gap-5 lg:flex lg:justify-between lg:w-full" : ""} flex flex-col gap-7 md:gap-0 md:flex-row md:justify-between`}
                  >
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-neutral-900 text-xl">
                        {item.name}
                      </h3>
                      <div className="flex gap-1 font-medium text-neutral-600 md:col-start-2">
                        <p>{capitalizeFirstLetter(item.color)}</p>
                        {item.size && <span>•</span>}
                        <p>{item.size}</p>
                      </div>
                      <p className="font-medium text-neutral-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right flex flex-col gap-2">
                      {item.discount > 0 && (
                        <span className="font-medium text-lg text-neutral-900">
                          $
                          {formatPrice(
                            item.price - (item.price / 100) * item.discount
                          )}
                        </span>
                      )}
                      <span
                        className={`font-medium text-lg  ${item.discount && item.discount > 0 && variant !== "order-confirmation" ? "text-xs line-through text-neutral-600" : ""} ${variant === "order-confirmation" ? " text-neutral-600 line-through" : "text-neutral-900"}`}
                      >
                        ${formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`flex justify-between pb-[18px] ${variant === "order-confirmation" ? "pt-0" : "pt-8"}`}
        >
          <p className="text-neutral-600">Subtotal</p>
          <span className="font-semibold text-lg text-neutral-900">
            ${formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-neutral-600">Shipping</p>
          <span className="font-semibold text-lg text-neutral-900">FREE</span>
        </div>
        {variant === "cart" && !couponShow && !coupon ? (
          <div className="flex justify-end items-center gap-[8px] pt-[16px]">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.670776 5.91667V1.33333C0.670776 0.8731 1.04388 0.5 1.50411 0.5H16.5041C16.9644 0.5 17.3375 0.8731 17.3375 1.33333V5.91667C16.1869 5.91667 15.2541 6.84942 15.2541 8C15.2541 9.15058 16.1869 10.0833 17.3375 10.0833V14.6667C17.3375 15.1269 16.9644 15.5 16.5041 15.5H1.50411C1.04388 15.5 0.670776 15.1269 0.670776 14.6667V10.0833C1.82137 10.0833 2.75411 9.15058 2.75411 8C2.75411 6.84942 1.82137 5.91667 0.670776 5.91667ZM2.33744 4.6398C3.57221 5.25343 4.42078 6.52758 4.42078 8C4.42078 9.47242 3.57221 10.7466 2.33744 11.3602V13.8333H15.6708V11.3602C14.436 10.7466 13.5875 9.47242 13.5875 8C13.5875 6.52758 14.436 5.25343 15.6708 4.6398V2.16667H2.33744V4.6398ZM6.50411 5.5H11.5041V7.16667H6.50411V5.5ZM6.50411 8.83333H11.5041V10.5H6.50411V8.83333Z"
                fill="#4338CA"
              />
            </svg>
            <p
              onClick={() => setCouponShow(!couponShow)}
              className="font-medium text-indigo-700 "
            >
              Add coupon code
            </p>
          </div>
        ) : (
          <div className="flex flex-col pt-[18px]">
            <div className="flex flex-row justify-between">
              {couponCode && (
                <>
                  <div className="flex flex-col gap-2 md:flex-row md:gap-9">
                    {variant === "checkout" && (
                      <span className="text-neutral-600">Coupon discount</span>
                    )}
                    <span className="text-sm text-indigo-700 bg-indigo-50 w-fit px-2.5 py-1 rounded-full border border-solid border-indigo-200">
                      {couponCode}
                    </span>
                  </div>
                  <p className="font-semibold text-lg text-neutral-900">
                    -$5.00
                  </p>
                </>
              )}
            </div>
            {variant === "cart" && (
              <>
                <label className="pt-[16px] pb-[6px] text-neutral-700 text-sm font-medium">
                  Coupon code
                </label>
                <div className="flex gap-[8px]">
                  <input
                    maxLength={11}
                    ref={couponField}
                    className="w-full items-center gap-2 self-stretch bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200 flex-row justify-between placeholder:text-sm placeholder:text-neutral-500"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                  <Button
                    type="apply"
                    onClick={() => {
                      if (couponField.current) {
                        setCouponCode(couponField.current.value);
                        couponField.current.value = "";
                      }
                    }}
                  >
                    Apply
                  </Button>
                </div>
                {couponCode && (
                  <div className="flex items-center gap-[9px] bg-gray-200 px-[10px] py-1 rounded border-[0.5px] border-solid border-neutral-200 w-fit mt-[8px] text-sm">
                    {couponCode}
                    <svg
                      onClick={() => setCouponCode("")}
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00058 4.82208L10.1253 0.697266L11.3038 1.87577L7.17908 6.00058L11.3038 10.1253L10.1253 11.3038L6.00058 7.17908L1.87577 11.3038L0.697266 10.1253L4.82208 6.00058L0.697266 1.87577L1.87577 0.697266L6.00058 4.82208Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="">
        <div className="flex justify-between pt-[26px] md:py-[32px] border-t-[1px] border-dashed border-neutral-200 mt-[36px] md:mt-[32px]">
          <p
            className={`${variant === "order-confirmation" ? "font-normal text-base" : "font-medium text-2xl"} text-neutral-900`}
          >
            Total
          </p>
          <span
            className={`font-semibold  ${variant === "order-confirmation" ? "text-2xl" : "text-4xl"} text-right text-neutral-900`}
          >
            ${formatPrice(total)}
          </span>
        </div>
        {variant === "cart" && (
          <Button type="checkout" onClick={() => navigate("/checkout")}>
            Checkout
          </Button>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
