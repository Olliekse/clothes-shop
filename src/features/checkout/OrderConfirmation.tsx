import confirmationImgMobile from "../../assets/images/order-confirmation.png";
import confirmationImgTablet from "../../assets/images/order-confirmation-tablet.png";
import confirmationImgDesktop from "../../assets/images/order-confirmation-desktop.png";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useMediaQuery } from "react-responsive";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router";
import Button from "../../components/Button";

function OrderConfirmation() {
  const { checkoutData } = useCartStore();
  const navigate = useNavigate();

  const isTablet = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const getImageSrc = () => {
    if (isDesktop) return confirmationImgDesktop;
    if (isTablet) return confirmationImgTablet;
    return confirmationImgMobile;
  };

  return (
    <div className="px-3 lg:px-[96px] bg-white py-12 md:py-[64px] lg:grid lg:grid-cols-2 lg:gap-8">
      {/* Left column - Image only */}
      <div className="lg:col-start-1">
        <img src={getImageSrc()} className="object-cover w-full" />
      </div>

      {/* Right column - All content */}
      <div className="lg:col-start-2 flex flex-col">
        <h1 className="font-semibold text-3xl md:text-4xl text-neutral-900 pt-12 lg:pt-0 lg:pb-4">
          Your order is confirmed.
        </h1>
        <p className="text-base text-neutral-600 pt-4">
          Your order is now in the queue and being processed. We'll let you know
          when we ship it out!
        </p>
        <div className="flex flex-col gap-1 pt-12">
          <p className="text-base text-neutral-600">Order Number</p>
          <div className="flex flex-row gap-[8.5px]">
            <p className="font-medium text-base text-indigo-700">1928371928</p>
            <svg
              className="self-center"
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.83317 4.00008V1.50008C3.83317 1.03985 4.20627 0.666748 4.6665 0.666748H14.6665C15.1267 0.666748 15.4998 1.03985 15.4998 1.50008V13.1667C15.4998 13.627 15.1267 14.0001 14.6665 14.0001H12.1665V16.4993C12.1665 16.96 11.7916 17.3334 11.3275 17.3334H1.33888C0.875492 17.3334 0.5 16.9629 0.5 16.4993L0.502167 4.83414C0.50225 4.37351 0.8772 4.00008 1.34118 4.00008H3.83317ZM2.16868 5.66675L2.16682 15.6667H10.4998V5.66675H2.16868ZM5.49983 4.00008H12.1665V12.3334H13.8332V2.33341H5.49983V4.00008ZM3.83333 8.16675H8.83333V9.83342H3.83333V8.16675ZM3.83333 11.5001H8.83333V13.1667H3.83333V11.5001Z"
                fill="#4338CA"
              />
            </svg>
          </div>
          <OrderSummary variant="order-confirmation" />
        </div>

        {checkoutData && (
          <>
            <div className="md:flex">
              <div className="pt-8 pb-[44px] md:pt-0 w-[50%]">
                <h3 className="pb-4 text-base text-neutral-600">
                  Shipping Address
                </h3>
                <div className="text-sm text-neutral-600">
                  <p>
                    {checkoutData.shipping.firstName}{" "}
                    {checkoutData.shipping.lastName}
                  </p>
                  <p>
                    {checkoutData.shipping.address}
                    {checkoutData.shipping.apartment &&
                      `, Apartment ${checkoutData.shipping.apartment}`}
                  </p>
                  <p>
                    {checkoutData.shipping.city}, {checkoutData.shipping.state}{" "}
                    {checkoutData.shipping.zip}
                  </p>
                  <p>{checkoutData.shipping.country}</p>
                </div>
              </div>
              <div className="pt-8 md:pt-0">
                <h3 className="pb-4 text-base text-neutral-600">Payment</h3>
                <div className="flex gap-4 pb-12">
                  <div className="border flex px-[10px] py-4 rounded-md">
                    <svg
                      width="49"
                      height="16"
                      viewBox="0 0 49 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="self-center"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.624 15.7165H8.48089L5.37403 3.58476C5.22656 3.0267 4.91345 2.53335 4.45288 2.30082C3.30346 1.71648 2.03688 1.25142 0.655151 1.01688V0.549805H7.32945C8.2506 0.549805 8.94146 1.25142 9.05661 2.06627L10.6686 10.8173L14.8098 0.549805H18.8378L12.624 15.7165ZM21.1416 15.7165H17.2288L20.4508 0.549817H24.3636L21.1416 15.7165ZM29.4242 4.75144C29.5393 3.93457 30.2302 3.4675 31.0362 3.4675C32.3028 3.35022 33.6825 3.58477 34.8339 4.16709L35.5248 0.901632C34.3734 0.434559 33.1068 0.200012 31.9574 0.200012C28.1596 0.200012 25.3962 2.30083 25.3962 5.21649C25.3962 7.43458 27.3536 8.59923 28.7354 9.30085C30.2302 10.0004 30.8059 10.4675 30.6908 11.1671C30.6908 12.2165 29.5393 12.6836 28.3899 12.6836C27.0082 12.6836 25.6265 12.3338 24.3619 11.7494L23.671 15.0169C25.0528 15.5992 26.5476 15.8338 27.9293 15.8338C32.1876 15.949 34.8339 13.8503 34.8339 10.7C34.8339 6.73296 29.4242 6.50043 29.4242 4.75144ZM48.5287 15.7165L45.4219 0.549805H42.0847C41.3938 0.549805 40.703 1.01688 40.4727 1.71648L34.7195 15.7165H38.7475L39.5515 13.5004H44.5007L44.9613 15.7165H48.5287ZM42.6614 4.63439L43.8108 10.3505H40.5888L42.6614 4.63439Z"
                        fill="#172B85"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-neutral-900">
                      Ending with {checkoutData.payment.cardNumber.slice(-4)}
                    </p>
                    <p className="text-neutral-600 text-sm">
                      Expires {checkoutData.payment.expiry}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:mt-auto">
              <Button
                onClick={() => {
                  navigate("/products");
                }}
                type="continueShopping"
              >
                Continue Shopping
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-[10px]"
                >
                  <path
                    d="M8.89708 5.30549L5.17208 1.58048L6.15416 0.598389L11.5557 5.99993L6.15416 11.4014L5.17208 10.4193L8.89708 6.69437H0.44458V5.30549H8.89708Z"
                    fill="#171717"
                  />
                </svg>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderConfirmation;
