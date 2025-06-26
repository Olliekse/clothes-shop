import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

function CartPersistence() {
  const items = useCartStore((state) => state.items);
  const initializeFromStorage = useCartStore(
    (state) => state.initializeFromStorage
  );

  useEffect(() => {
    initializeFromStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  return null;
}

export default CartPersistence;
