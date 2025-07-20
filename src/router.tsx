import { createBrowserRouter } from "react-router-dom";
import { ProductList } from "./features/products/components/ProductList";
import ProductDetails from "./features/products/components/ProductDetails";
import Cart from "./features/cart/Cart";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProductList />,
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
