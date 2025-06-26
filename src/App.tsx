import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CartPersistence from "./features/cart/CartPersistence";

function App() {
  return (
    <>
      <CartPersistence />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
