import { Link, NavLink } from "react-router";
import { useCartStore } from "../../../../store/cartStore";
import React from "react";

const Logo = React.memo(() => (
  <Link className="flex gap-1 flex-row" to="/">
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.0741 4.69614C17.8281 5.2513 18.2549 6.03018 18.3543 7.03279H23.5123C23.4875 5.51645 23.0814 4.18241 22.2943 3.03066C21.5725 1.97466 20.5861 1.1311 19.335 0.5L25.6667 0.5C26.9553 0.5 28 1.54467 28 2.83333V19.1667C28 20.4553 26.9553 21.5 25.6667 21.5H22.9493C23.5494 20.4563 23.8531 19.2548 23.8603 17.8957C23.852 16.8351 23.6573 15.8946 23.2762 15.0743C22.9033 14.254 22.3771 13.5414 21.6977 12.9366C21.0182 12.3317 20.2145 11.8221 19.2865 11.4078C18.3584 10.9935 17.3393 10.662 16.2289 10.4135L13.942 9.86659C13.3868 9.7423 12.8648 9.59316 12.3759 9.41915C11.8871 9.23686 11.4562 9.02557 11.0833 8.78527C10.7105 8.53669 10.4163 8.24254 10.2009 7.90282C9.99373 7.56309 9.89844 7.16536 9.91501 6.70963C9.91501 6.16276 10.0724 5.67388 10.3873 5.24301C10.7105 4.81214 11.1745 4.47656 11.7794 4.23627C12.3842 3.98769 13.1258 3.8634 14.0041 3.8634C15.2968 3.8634 16.3201 4.14098 17.0741 4.69614ZM4.87106 21.5H2.33333C1.04467 21.5 0 20.4553 0 19.1667V2.83333C0 1.54467 1.04467 0.5 2.33333 0.5L8.71256 0.5C7.42284 1.1311 6.39432 1.97466 5.62701 3.03066C4.79841 4.18241 4.38826 5.52888 4.39654 7.07007C4.38826 8.95099 5.00556 10.4466 6.24846 11.5569C7.49136 12.6673 9.18584 13.4834 11.3319 14.0054L14.1036 14.7015C15.0316 14.9252 15.8146 15.1738 16.4527 15.4472C17.099 15.7206 17.5878 16.0521 17.9193 16.4415C18.259 16.831 18.4289 17.3116 18.4289 17.8833C18.4289 18.4964 18.2424 19.0392 17.8696 19.5115C17.4967 19.9838 16.9705 20.3525 16.2911 20.6177C15.6199 20.8828 14.8286 21.0154 13.9171 21.0154C12.9891 21.0154 12.1564 20.8745 11.4189 20.5928C10.6897 20.3028 10.1056 19.8761 9.66643 19.3126C9.23556 18.7409 8.99112 18.0283 8.93312 17.1748H3.72538C3.76369 18.868 4.14558 20.3098 4.87106 21.5Z"
        fill="#6366F1"
      />
    </svg>

    <span className="font-bold text-neutral-900 xl:pr-[103px]">StyleNest</span>
  </Link>
));

const NavLinks = React.memo(() => (
  <div className="xl:flex xl:gap-[34px] hidden">
    <NavLink
      className="font-medium text-neutral-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1"
      to=""
    >
      Shop all
    </NavLink>
    <NavLink
      className="font-medium text-neutral-600 focus:outline-none focus:ring-4 focus:ring-indigo-100 rounded-sm p-1"
      to=""
    >
      Latest arrivals
    </NavLink>
  </div>
));

const BurgerMenu = React.memo(() => (
  <svg
    className="xl:hidden"
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.5 0.333252H15.5V1.99992H0.5V0.333252ZM0.5 6.16658H15.5V7.83325H0.5V6.16658ZM0.5 11.9999H15.5V13.6666H0.5V11.9999Z"
      fill="#525252"
    />
  </svg>
));

function Header() {
  const { items } = useCartStore();
  const cartCount = items.length;

  return (
    <header className="flex justify-between py-[22px] md:px-[16px] md:pb-[34px] xl:px-[100px]">
      <div className="flex items-center">
        <Logo />
        <NavLinks />
      </div>

      <div className="flex gap-[19px] items-center relative">
        <Link to="/cart">
          <button
            className="
              focus:outline-none
              focus:ring-4
              focus:ring-indigo-100
              rounded-sm
              p-1
              relative
            "
            aria-label="View cart"
          >
            <svg
              width="18"
              height="20"
              viewBox="0 0 18 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.50488 0H14.5049C14.8196 0 15.116 0.14819 15.3049 0.4L18.0049 4V19C18.0049 19.5523 17.5572 20 17.0049 20H1.00488C0.452603 20 0.00488281 19.5523 0.00488281 19V4L2.70488 0.4C2.89374 0.14819 3.19013 0 3.50488 0ZM16.0049 6H2.00488V18H16.0049V6ZM15.5049 4L14.0049 2H4.00488L2.50488 4H15.5049ZM6.00488 8V10C6.00488 11.6569 7.348 13 9.0049 13C10.6617 13 12.0049 11.6569 12.0049 10V8H14.0049V10C14.0049 12.7614 11.7663 15 9.0049 15C6.24346 15 4.00488 12.7614 4.00488 10V8H6.00488Z"
                fill="#525252"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-700 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;
