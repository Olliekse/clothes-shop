import { useState } from "react";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useNavigate } from "react-router";
import { useCartStore } from "../../store/cartStore";
import Button from "../../components/Button";

const deliveryMethods = [
  { name: "Standard", speed: "4-10 business days", cost: "free" },
  { name: "Express", speed: "2-5 business days", cost: "$15.00" },
];

function Checkout() {
  const [isActive, setIsActive] = useState("Standard");

  const navigate = useNavigate();

  const { setCheckoutData } = useCartStore();

  const [formData, setFormData] = useState({
    contact: {
      email: "",
    },
    shipping: {
      country: "",
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
    },
    payment: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
    deliveryMethod: "Standard",
  });

  function handleInputChange(
    section: keyof typeof formData,
    field: string,
    value: string
  ) {
    setFormData((prev) => {
      const sectionData = prev[section] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: value,
        },
      };
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Basic validation
    if (
      !formData.contact.email ||
      !formData.shipping.firstName ||
      !formData.shipping.lastName ||
      !formData.shipping.address ||
      !formData.shipping.city ||
      !formData.shipping.state ||
      !formData.shipping.zip ||
      !formData.payment.cardNumber ||
      !formData.payment.cardName ||
      !formData.payment.expiry ||
      !formData.payment.cvv
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Update delivery method before submitting
    const finalFormData = {
      ...formData,
      deliveryMethod: isActive,
    };

    setCheckoutData(finalFormData);
    navigate("/order-confirmation");
  }

  function handleDeliveryMethodClick(methodName: string) {
    setIsActive(methodName);
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: methodName,
    }));
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
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="xl:flex xl:flex-row gap-8 justify-between">
          <div className="xl:flex xl:flex-col">
            <div>
              <h4 className="font-medium text-lg text-neutral-600 pb-8">
                Contact information
              </h4>
              <div className="flex flex-col border-b border-grey-1 pb-10">
                <label className="">Email *</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="user@example.com"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleInputChange("contact", "email", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <h4 className="font-medium text-lg text-neutral-600 pb-6 pt-6">
              Shipping information
            </h4>
            <div className="flex flex-col pb-6">
              <label className="">Country / Region *</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="United States"
                value={formData.shipping.country}
                onChange={(e) =>
                  handleInputChange("shipping", "country", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">First name *</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="John"
                value={formData.shipping.firstName}
                onChange={(e) =>
                  handleInputChange("shipping", "firstName", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">Last name *</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="Appleseed"
                value={formData.shipping.lastName}
                onChange={(e) =>
                  handleInputChange("shipping", "lastName", e.target.value)
                }
                required
              />
            </div>
            <div className="flex flex-col pb-6">
              <label className="">Address *</label>

              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200 mb-4"
                placeholder="Street address"
                value={formData.shipping.address}
                onChange={(e) =>
                  handleInputChange("shipping", "address", e.target.value)
                }
                required
              />
              <input
                className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                placeholder="Apartment, suite, etc (optional)"
                value={formData.shipping.apartment}
                onChange={(e) =>
                  handleInputChange("shipping", "apartment", e.target.value)
                }
              />
            </div>
            <div className="xl:flex xl:flex-row border-b border-grey-1 pb-10 xl:gap-8">
              <div className="flex flex-col xl:w-full pb-6">
                <label className="">City *</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="City"
                  value={formData.shipping.city}
                  onChange={(e) =>
                    handleInputChange("shipping", "city", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex flex-col xl:w-full pb-6">
                <label className="">State *</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="State"
                  value={formData.shipping.state}
                  onChange={(e) =>
                    handleInputChange("shipping", "state", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex flex-col xl:w-full">
                <label className="">Zip *</label>
                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="12345"
                  value={formData.shipping.zip}
                  onChange={(e) =>
                    handleInputChange("shipping", "zip", e.target.value)
                  }
                  required
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
                      onClick={() => handleDeliveryMethodClick(method.name)}
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
                <label className="">Card number *</label>
                <div className="relative">
                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 pl-[56px] w-full py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="1234 1234 1234 1234"
                    value={formData.payment.cardNumber}
                    onChange={(e) =>
                      handleInputChange("payment", "cardNumber", e.target.value)
                    }
                    required
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
                <label className="">Name on card *</label>

                <input
                  className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                  placeholder="Full name on card"
                  value={formData.payment.cardName}
                  onChange={(e) =>
                    handleInputChange("payment", "cardName", e.target.value)
                  }
                  required
                />
              </div>
              <div className="flex gap-8">
                <div className="flex flex-col w-[45%] md:w-full">
                  <label className="">Expiry *</label>

                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="MM/YY"
                    value={formData.payment.expiry}
                    onChange={(e) =>
                      handleInputChange("payment", "expiry", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex flex-col w-[45%] md:w-full">
                  <label className="">CVV *</label>

                  <input
                    className="mt-[6px] bg-neutral-50 px-3.5 py-2.5 rounded border border-solid border-neutral-200"
                    placeholder="123"
                    value={formData.payment.cvv}
                    onChange={(e) =>
                      handleInputChange("payment", "cvv", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <OrderSummary variant="checkout" />
        </div>

        <div className="flex justify-end mt-8">
          <Button type="checkout" onClick={handleSubmit}>
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3611 5.6111H12.0556C12.4391 5.6111 12.75 5.922 12.75 6.30554V13.25C12.75 13.6335 12.4391 13.9444 12.0556 13.9444H0.944444C0.560917 13.9444 0.25 13.6335 0.25 13.25V6.30554C0.25 5.922 0.560917 5.6111 0.944444 5.6111H1.63889V4.91665C1.63889 2.23194 3.81528 0.055542 6.5 0.055542C9.18472 0.055542 11.3611 2.23194 11.3611 4.91665V5.6111ZM1.63889 6.99999V12.5555H11.3611V6.99999H1.63889ZM5.80556 8.38888H7.19444V11.1667H5.80556V8.38888ZM9.97222 5.6111V4.91665C9.97222 2.999 8.41764 1.44443 6.5 1.44443C4.58235 1.44443 3.02778 2.999 3.02778 4.91665V5.6111H9.97222Z"
                fill="white"
              />
            </svg>
            Confirm Order
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
