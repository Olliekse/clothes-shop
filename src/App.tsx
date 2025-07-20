import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CartPersistence from "./features/cart/CartPersistence";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary
      fallback={<div>Oops! Something broke. Please try again later.</div>}
    >
      <CartPersistence />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
