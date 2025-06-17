import { createBrowserRouter } from "react-router-dom";
import ProductList from "./features/products/components/ProductList";
import ProductDetails from "./features/products/components/ProductDetails";

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
  ],
  {
    basename: "/clothes-shop",
  }
);
