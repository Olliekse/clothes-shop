import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";

function CartPersistence() {
  const items = useCartStore((state) => state.items);
  const couponCode = useCartStore((state) => state.couponCode);
  const setCouponCode = useCartStore((state) => state.setCouponCode);
  const initializeFromStorage = useCartStore(
    (state) => state.initializeFromStorage
  );

  useEffect(() => {
    initializeFromStorage();

    const stored = localStorage.getItem("couponCode");
    if (stored) {
      setCouponCode(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("couponCode", JSON.stringify(couponCode));
  }, [couponCode]);

  return null;
}

export default CartPersistence;
