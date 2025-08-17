import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "./features/products/pages/ProductDetails";
import Cart from "./features/cart/Cart";
import Storefront from "./features/products/pages/Storefront";
import Checkout from "./features/checkout/Checkout";
import Products from "./features/products/pages/Products";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Storefront />,
    },
    {
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:id",
      element: <ProductDetails />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    { path: "/checkout", element: <Checkout /> },
  ],
  {
    basename: "/clothes-shop",
  }
);
