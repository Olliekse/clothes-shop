import { createBrowserRouter } from "react-router-dom";
import ProductDetails from "./features/products/components/ProductDetails";
import Cart from "./features/cart/Cart";
import Storefront from "./features/products/pages/Storefront";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Storefront />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ],
  {
    basename: "/clothes-shop",
  }
);
