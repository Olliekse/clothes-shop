import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import CartPersistence from "./features/cart/CartPersistence";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { useEffect } from "react";

function App() {
  // Preload critical images
  useEffect(() => {
    const criticalImages = [
      "/src/assets/images/Hero image.jpg",
      // Add other critical images here
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

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
