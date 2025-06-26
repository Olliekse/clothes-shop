import Button from "../../components/Button";
import Quantity from "../../components/Quantity";
import { useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../store/cartStore";

import { capitalizeFirstLetter } from "../products/utils/productHelpers";

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

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.price;
    const discount = item.discount || 0;
    const discountedPrice = itemPrice - (itemPrice * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  const total = subtotal;

  return (
    <div className="flex gap-[16px] min-[768px]:gap-[64px] flex-col px-[12px] pt-[48px] min-[768px]:pt-[64px] min-[1440px]:p-[96px] min-[1440px]:grid min-[1440px]:grid-cols-[800px_1fr] min-[1440px]:gap-x-[32px]">
      <h1 className="font-semibold text-3xl text-neutral-900 min-[768px]:font-semibold min-[768px]:text-5xl min-[768px]:text-neutral-900">
        Shopping Cart
      </h1>
      <ul className="min-[1440px]:col-start-1">
        {items.map((item, index) => (
          <div
            key={index}
            className={`
              flex flex-col gap-[16px] pb-[32px]
              ${index !== items.length - 1 ? "border-b-[1px] border-dashed border-neutral-200" : "pb-[64px]"}
              min-[768px]:grid min-[768px]:grid-cols-[280px_1fr] min-[768px]:gap-x-8
            `}
          >
            <img
              className="w-full object-cover h-[200px] rounded-lg mt-[32px] min-[768px]:w-[280px] min-[768px]:row-span-4 min-[768px]:mt-0"
              src={item.image}
            />
            <h3 className="font-medium text-2xl text-neutral-900 min-[768px]:col-start-2">
              {item.name}
            </h3>
            <div className="flex gap-[5px] font-medium text-base text-neutral-600 min-[768px]:col-start-2">
              <p>{capitalizeFirstLetter(item.color)}</p>
              {item.size && <span>•</span>}
              <p>{item.size}</p>
            </div>
            <p className="font-normal text-sm text-neutral-600 min-[768px]:col-start-2">
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
                    className={`font-medium text-lg text-neutral-900 ${item.discount && item.discount > 0 ? "min-[375px]:pl-[38px] min-[768px]:pl-[120px] min-[1440px]:pl-[205px]" : "pl-[55px]"}`}
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
      <div className="border border-solid border-neutral-200 rounded-lg p-[16px]">
        <h2 className="font-semibold text-2xl text-neutral-900 pb-[32px]">
          Order Summary
        </h2>
        <div className="flex justify-between pb-[18px]">
          <p className="text-base text-neutral-600">Subtotal</p>
          <span className="font-semibold text-lg text-neutral-900">
            ${formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-base text-neutral-600">Shipping</p>
          <span className="font-semibold text-lg text-neutral-900">FREE</span>
        </div>
        <div className="flex justify-end items-center gap-[8px] pt-[18px] pb-[32px]">
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

          <p className="font-medium text-base text-indigo-700 ">
            Add coupon code
          </p>
        </div>
        <div className="flex justify-between pt-[32px] border-t-[1px] border-dashed border-neutral-200">
          <p className="font-medium text-2xl text-neutral-900">Total</p>
          <span className="font-semibold text-4xl text-right text-neutral-900">
            ${formatPrice(total)}
          </span>
        </div>
        <Button type="addToCartCheckout" onClick={() => {}}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
