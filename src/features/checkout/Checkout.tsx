import { useState } from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useNavigate } from "react-router";

const deliveryMethods = [
  { name: "Standard", speed: "4-10 business days", cost: "free" },
  { name: "Express", speed: "2-5 business days", cost: "$15.00" },
];

function Checkout() {
  const [isActive, setIsActive] = useState("Standard");

  const navigate = useNavigate();

  function handleClick(id: string) {
    if (isActive === id) return;
    setIsActive(id);
  }

  return (
    <div className="px-3 py-12 bg-white xl:p-[96px]">
      <div className="flex gap-[6px] cursor-pointer items-center pl-[6px]">
        <div className="w-2 h-2 border-t-2 border-l-2 border-indigo-700 rotate-[-45deg]" />
        <span
          onClick={() => navigate("/cart")}
          className="font-medium text-sm text-indigo-700"
        >
          Back to Shopping Cart
        </span>
      </div>
      <h2 className="font-semibold text-2xl xl:text-4xl text-neutral-900 py-8">
        Checkout
      </h2>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="xl:flex xl:flex-row gap-8 justify-between">
          <div className="xl:flex xl:flex-col">
            <div>
              <h4 className="font-medium text-lg text-neutral-600 pb-8">
                Contact information
              </h4>
              <div className="flex flex-col border-b border-grey-1 pb-10">
                <label className="">Email</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <h4 className="font-medium text-lg text-neutral-600 pb-6 pt-6">
              Shipping information
            </h4>
            <div className="flex flex-col pb-6">
              <label className="">Country / Region</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="United States"
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">First name</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">Last name</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="Appleseed"
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">Address</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200 mb-4"
                placeholder="Street address"
              />
              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="Apartment, suite, etc (optional)"
              />
            </div>
            <div className="xl:flex xl:flex-row border-b border-grey-1 pb-10 xl:gap-8">
              <div className="flex flex-col xl:w-full">
                <label className="">City</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="City"
                />
              </div>
              <div className="flex flex-col xl:w-full">
                <label className="">State</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="State"
                />
              </div>
              <div className="flex flex-col xl:w-full">
                <label className="">Zip</label>
                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="12345"
                />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-lg text-neutral-600 pt-10 pb-6">
                Delivery method
              </h4>
              <div className="flex flex-col gap-4 md:flex-row">
                {deliveryMethods.map((method) => (
                  <div
                    key={method.name}
                    className={`h-[120px] flex flex-col gap-2 p-4 rounded-lg md:w-full ${
                      isActive === method.name
                        ? "border-2 border-indigo-600"
                        : "border-[1px] border-grey"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleClick(method.name)}
                    >
                      <div className="text-left">
                        <div className="flex justify-between">
                          <p className="font-medium text-neutral-900">
                            {method.name}
                          </p>
                          {isActive === method.name && (
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM9.0026 14L16.0737 6.92893L14.6595 5.51472L9.0026 11.1716L6.17421 8.3431L4.75999 9.7574L9.0026 14Z"
                                fill="#6366F1"
                              />
                            </svg>
                          )}
                        </div>

                        <p className="text-sm text-neutral-600">
                          {method.speed}
                        </p>
                        <p className="pt-5 uppercase font-medium text-neutral-900">
                          {method.cost}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-grey mt-10">
              <h4 className="font-medium text-lg text-neutral-600 pt-10 pb-6">
                Payment method
              </h4>
              <div className="flex flex-col pb-6">
                <label className="">Card number</label>
                <div className="relative">
                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 pl-[56px] w-full py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="1234 1234 1234 1234"
                  />
                  <svg
                    aria-hidden="true"
                    className="absolute left-3 top-7 transform -translate-y-1/2"
                    width="34"
                    height="24"
                    viewBox="0 0 34 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4C0.5 2.067 2.067 0.5 4 0.5Z"
                      fill="white"
                    />
                    <path
                      d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V20C33.5 21.933 31.933 23.5 30 23.5H4C2.067 23.5 0.5 21.933 0.5 20V4C0.5 2.067 2.067 0.5 4 0.5Z"
                      stroke="#E6E6E6"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.1791 16.8294C15.9951 17.8275 14.4591 18.43 12.7807 18.43C9.03582 18.43 6 15.4303 6 11.73C6 8.02972 9.03582 5.03003 12.7807 5.03003C14.4591 5.03003 15.9951 5.63258 17.1791 6.6307C18.3632 5.63258 19.8992 5.03003 21.5776 5.03003C25.3224 5.03003 28.3583 8.02972 28.3583 11.73C28.3583 15.4303 25.3224 18.43 21.5776 18.43C19.8992 18.43 18.3632 17.8275 17.1791 16.8294Z"
                      fill="#ED0006"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.1791 16.8294C18.6369 15.6005 19.5613 13.7719 19.5613 11.73C19.5613 9.68815 18.6369 7.8596 17.1791 6.6307C18.3631 5.63258 19.8991 5.03003 21.5775 5.03003C25.3224 5.03003 28.3582 8.02972 28.3582 11.73C28.3582 15.4303 25.3224 18.43 21.5775 18.43C19.8991 18.43 18.3631 17.8275 17.1791 16.8294Z"
                      fill="#F9A000"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.1791 16.8293C18.637 15.6004 19.5614 13.7718 19.5614 11.7299C19.5614 9.68806 18.637 7.85952 17.1791 6.63062C15.7213 7.85952 14.7969 9.68806 14.7969 11.7299C14.7969 13.7718 15.7213 15.6004 17.1791 16.8293Z"
                      fill="#FF5E00"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col pb-6">
                <label className="">Name on card</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="Full name on card"
                />
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col w-[45%] md:w-full">
                  <label className="">Expiry</label>

                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex flex-col w-[45%] md:w-full">
                  <label className="">CVV</label>

                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </div>
          <OrderSummary variant="checkout" />
        </div>
      </form>
    </div>
  );
}

export default Checkout;
