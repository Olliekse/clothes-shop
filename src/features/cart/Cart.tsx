import Button from "../../components/Button";
import Quantity from "../../components/Quantity";
import { useCartStore } from "../../store/cartStore";
import type { CartItem } from "../../store/cartStore";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

import cartImg from "../../assets/images/cart.jpg";

import {
  capitalizeFirstLetter,
  formatPrice,
} from "../products/utils/productHelpers";

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

  return (
    <div
      className={`flex flex-col px-3 md:px-4 py-12 md:pt-16 xl:p-[96px] ${items.length > 0 ? "xl:grid" : ""} xl:grid-cols-[800px_1fr] xl:gap-x-[32px] bg-white`}
    >
      <h1 className="font-semibold text-3xl pb-8 text-neutral-900 md:font-semibold md:text-5xl md:text-neutral-900">
        Shopping Cart
      </h1>

      {items.length > 0 && (
        <>
          <ul className="xl:col-start-1">
            {items.map((item, index) => (
              <div
                key={index}
                className={`
              flex flex-col pb-8
              ${index !== items.length - 1 ? "border-b border-dashed border-neutral-200" : "pb-16"}
              min-[768px]:grid md:grid-cols-[280px_1fr] md:gap-x-8 md:pt-[32px]
            `}
              >
                <img
                  className="w-full object-cover h-[200px] rounded-lg md:w-[280px] md:row-span-4 mt-8 md:mt-0"
                  src={item.image}
                />
                <h3 className="font-medium text-2xl text-neutral-900 md:col-start-2 md:pt-[0] py-[16px]">
                  {item.name}
                </h3>
                <div className="flex gap-1 font-medium text-neutral-600 md:col-start-2">
                  <p>{capitalizeFirstLetter(item.color)}</p>
                  {item.size && <span>•</span>}
                  <p>{item.size}</p>
                </div>
                <p className="text-sm text-neutral-600 md:col-start-2 py-[16px]">
                  {item.description}
                </p>
                <div className="flex md:col-start-2">
                  <Quantity
                    initialQuantity={item.quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(item, newQuantity)
                    }
                  />
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="pl-4 font-medium text-sm text-neutral-600"
                    >
                      Remove
                    </button>

                    {typeof item.discount === "number" && item.discount > 0 && (
                      <span
                        className={`font-medium text-lg text-neutral-900 ${item.discount && item.discount > 0 ? "min-[375px]:pl-8 md:pl-28 xl:pl-52" : "pl-14"}`}
                      >
                        $
                        {formatPrice(
                          item.price - (item.price / 100) * item.discount
                        )}
                      </span>
                    )}
                    <span
                      className={`font-medium text-lg  ${item.discount && item.discount > 0 ? "text-xs line-through text-neutral-600 pl-1.5" : "text-neutral-900 min-[375px]:pl-[70px] md:pl-[172px] xl:pl-[260px]"}`}
                    >
                      ${formatPrice(item.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          <OrderSummary variant="cart" />
        </>
      )}
      {items.length === 0 && (
        <div className="flex flex-col xl:flex-row gap-[32px] pt-[48px] md:pt-[0]">
          <div className="flex flex-col items-center pt-[105px] pb-[90px] md:py-[104px] px-[42px] xl:px-[126px] xl:py-[120px]">
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
            <h2 className="font-medium text-xl text-center text-neutral-900 pb-[8px] pt-[22px] md:pt-[20px]">
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
            className="h-[180px] md:h-[320px] w-[full] object-cover xl:w-[696px] xl:h-[432px]"
            src={cartImg}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
