import Button from "../../components/Button";
import Quantity from "../../components/Quantity";
import { useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../store/cartStore";

import cartImg from "../../assets/images/cart.jpg";

import { capitalizeFirstLetter } from "../products/utils/productHelpers";
import { useRef, useState } from "react";

// const dummyData = [
//   {
//     image:
//       "https://cdn.thewirecutter.com/wp-content/media/2025/03/BG-RUNNING-SHOES-2048px-01924.jpg",
//     name: "Nice trainers",
//     color: "White",
//     size: 6,
//     description:
//       "Ground your steps in style with our Elemental Sneakers. Designed with the elements in mind, they bring a natural balance to your stride and your ensemble.",
//     price: 80,
//     discount: 20,
//   },
//   {
//     image:
//       "https://cdn.thewirecutter.com/wp-content/media/2025/03/BG-RUNNING-SHOES-2048px-01924.jpg",
//     name: "Nice trainers",
//     color: "White",
//     size: 6,
//     description:
//       "Ground your steps in style with our Elemental Sneakers. Designed with the elements in mind, they bring a natural balance to your stride and your ensemble.",
//     price: 80,
//     discount: 0,
//   },
//   {
//     image:
//       "https://cdn.thewirecutter.com/wp-content/media/2025/03/BG-RUNNING-SHOES-2048px-01924.jpg",
//     name: "Nice trainers",
//     color: "White",
//     size: 6,
//     description:
//       "Ground your steps in style with our Elemental Sneakers. Designed with the elements in mind, they bring a natural balance to your stride and your ensemble.",
//     price: 80,
//     discount: 10,
//   },
// ];

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCartStore();

  function handleRemoveFromCart(item: CartItem) {
    removeFromCart(item.product_id, item.color, item.size);
  }

  function handleQuantityChange(item: CartItem, newQuantity: number) {
    updateQuantity(item.product_id, item.color, item.size, newQuantity);
  }

  function formatPrice(price: number): string {
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  }

  const [couponShow, setCouponShow] = useState(false);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.price;
    const discount = item.discount || 0;

    const discountedPrice = itemPrice - (itemPrice * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const coupon = couponCode ? 5 : 0;
  const total = subtotal - coupon;

  const couponField = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex flex-col px-[12px] min-[768px]:px-[16px] py-[48px] min-[768px]:pt-[64px] min-[1440px]:p-[96px] ${items.length > 0 ? "min-[1440px]:grid" : ""} min-[1440px]:grid-cols-[800px_1fr] min-[1440px]:gap-x-[32px]`}
    >
      <h1 className="font-semibold text-3xl pb-[32px] text-neutral-900 min-[768px]:font-semibold min-[768px]:text-5xl min-[768px]:text-neutral-900">
        Shopping Cart
      </h1>

      {items.length > 0 && (
        <>
          <ul className="min-[1440px]:col-start-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={`
              flex flex-col pb-[32px]
              ${index !== items.length - 1 ? "border-b-[1px] border-dashed border-neutral-200" : "pb-[64px]"}
              min-[768px]:grid min-[768px]:grid-cols-[280px_1fr] min-[768px]:gap-x-8 min-[768px]:pt-[32px]
            `}
              >
                <img
                  className="w-full object-cover h-[200px] rounded-lg min-[768px]:w-[280px] min-[768px]:row-span-4 mt-[32px] min-[768px]:mt-0"
                  src={item.image}
                />
                <h3 className="font-medium text-2xl text-neutral-900 min-[768px]:col-start-2 min-[768px]:pt-[0] py-[16px]">
                  {item.name}
                </h3>
                <div className="flex gap-[5px] font-medium text-neutral-600 min-[768px]:col-start-2">
                  <p>{capitalizeFirstLetter(item.color)}</p>
                  {item.size && <span>•</span>}
                  <p>{item.size}</p>
                </div>
                <p className="text-sm text-neutral-600 min-[768px]:col-start-2 py-[16px]">
                  {item.description}
                </p>
                <div className="flex min-[768px]:col-start-2">
                  <Quantity
                    initialQuantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item, newQuantity)
                    }
                  />
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="pl-[18px] font-medium text-sm text-neutral-600"
                    >
                      Remove
                    </button>

                    {typeof item.discount === "number" && item.discount > 0 && (
                      <span
                        className={`font-medium text-lg text-neutral-900 ${item.discount && item.discount > 0 ? "min-[375px]:pl-[38px] min-[768px]:pl-[109px] min-[1440px]:pl-[205px]" : "pl-[55px]"}`}
                      >
                        $
                        {formatPrice(
                          item.price - (item.price / 100) * item.discount
                        )}
                      </span>
                    )}
                    <span
                      className={`font-medium text-lg  ${item.discount && item.discount > 0 ? "text-xs line-through text-neutral-600 pl-[6px]" : "text-neutral-900 min-[375px]:pl-[90px] min-[768px]:pl-[172px] min-[1440px]:pl-[260px]"}`}
                    >
                      ${formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          <div className="border border-solid border-neutral-200 rounded-lg py-[16px] px-[16px]  min-[768px]:p-[32px] min-[1440px]:mt-[32px]">
            <h2 className="font-semibold text-2xl text-neutral-900 pb-[32px]">
              Order Summary
            </h2>
            <div className="flex justify-between pb-[18px]">
              <p className="text-neutral-600">Subtotal</p>
              <span className="font-semibold text-lg text-neutral-900">
                ${formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-neutral-600">Shipping</p>
              <span className="font-semibold text-lg text-neutral-900">
                FREE
              </span>
            </div>
            {!couponShow ? (
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
                      <span className="text-sm text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-solid border-indigo-200">
                        {couponCode}
                      </span>
                      <p>-$5.00</p>
                    </>
                  )}
                </div>
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
                  <div className="flex items-center gap-[9px] bg-gray-200 px-[10px] py-1 rounded border-[0.5px] border-solid border-neutral-200 w-[144px] mt-[8px] text-sm">
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
              </div>
            )}

            <div className="flex justify-between pt-[26px] min-[768px]:py-[32px] border-t-[1px] border-dashed border-neutral-200 mt-[36px] min-[768px]:mt-[32px]">
              <p className="font-medium text-2xl text-neutral-900">Total</p>
              <span className="font-semibold text-4xl text-right text-neutral-900">
                ${formatPrice(total)}
              </span>
            </div>
            <Button type="Checkout" onClick={() => {}}>
              Checkout
            </Button>
          </div>
        </>
      )}
      {items.length === 0 && (
        <div className="flex flex-col min-[1440px]:flex-row gap-[32px] pt-[48px] min-[768px]:pt-[0]">
          <div className="flex flex-col items-center pt-[105px] pb-[90px] min-[768px]:py-[104px] px-[42px] min-[1440px]:px-[126px] min-[1440px]:py-[120px]">
            <div className="w-12 h-12 bg-white rounded-full shadow-md flex content-center justify-center flex-wrap">
              <svg
                width="21"
                height="21"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.50436 5.41662L0.261719 2.17398L1.67593 0.759766L4.91857 4.00241H20.1603C20.7126 4.00241 21.1603 4.45012 21.1603 5.00241C21.1603 5.09973 21.1461 5.19653 21.1182 5.28975L18.7182 13.2898C18.5913 13.7127 18.2019 14.0024 17.7603 14.0024H5.50436V16.0024H16.5044V18.0024H4.50436C3.95207 18.0024 3.50436 17.5547 3.50436 17.0024V5.41662ZM5.50436 6.00241V12.0024H17.0163L18.8163 6.00241H5.50436ZM5.00436 22.0024C4.17593 22.0024 3.50436 21.3308 3.50436 20.5024C3.50436 19.674 4.17593 19.0024 5.00436 19.0024C5.83279 19.0024 6.50436 19.674 6.50436 20.5024C6.50436 21.3308 5.83279 22.0024 5.00436 22.0024ZM17.0044 22.0024C16.1759 22.0024 15.5044 21.3308 15.5044 20.5024C15.5044 19.674 16.1759 19.0024 17.0044 19.0024C17.8328 19.0024 18.5044 19.674 18.5044 20.5024C18.5044 21.3308 17.8328 22.0024 17.0044 22.0024Z"
                  fill="#4338CA"
                />
              </svg>
            </div>
            <h2 className="font-medium text-xl text-center text-neutral-900 pb-[8px] pt-[22px] min-[768px]:pt-[20px]">
              Your cart is empty
            </h2>
            <p className="text-neutral-900 pb-[18px]">
              Let's go explore some products
            </p>
            <Button onClick={() => {}} type="explore">
              Explore products
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.39696 5.30524L5.67196 1.58023L6.65404 0.598145L12.0556 5.99969L6.65404 11.4011L5.67196 10.4191L9.39696 6.69413H0.944458V5.30524H9.39696Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
          <img
            className="h-[180px] min-[768px]:h-[320px] w-[full] object-cover min-[1440px]:w-[696px] min-[1440px]:h-[432px]"
            src={cartImg}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
