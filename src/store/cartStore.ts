import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type CartItem = {
  product_id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  image: string;
  discount: number;
};

type CartState = {
  items: CartItem[];
  couponCode: string;
  setCouponCode: (code: string) => void;
  clearCouponCode: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (
    product_id: string,
    color: string,
    size: string | number
  ) => void;
  clearCart: () => void;
  initializeFromStorage: () => void;
  updateQuantity: (
    product_id: string,
    color: string,
    size: string | number,
    quantity: number
  ) => void;
};

export const useCartStore = create<CartState>()(
  devtools(
    (set) => ({
      items: [],
      couponCode: "",
      setCouponCode: (code) => set({ couponCode: code }),
      clearCouponCode: () => set({ couponCode: "" }),
      addToCart: (item) => {
        set((state) => {
          if (!item || !item.product_id) {
            console.error("Invalid item passed to addToCart:", item);
            return state;
          }

          const existing = state.items.find(
            (i) =>
              i.product_id === item.product_id &&
              i.size === item.size &&
              i.color === item.color
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product_id === item.product_id &&
                i.size === item.size &&
                i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      removeFromCart: (
        product_id: string,
        color: string,
        size: string | number
      ) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product_id === product_id &&
                item.color === color &&
                item.size === size
              )
          ),
        })),
      clearCart: () => set({ items: [] }),
      initializeFromStorage: () => {
        const stored = localStorage.getItem("cart");

        if (stored) {
          const parsedItems = JSON.parse(stored);

          set((state) => {
            if (state.items.length === 0) {
              return { items: parsedItems };
            }

            return state;
          });
        }
      },
      updateQuantity: (
        product_id: string,
        color: string,
        size: string | number,
        quantity: number
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product_id === product_id &&
            item.color === color &&
            item.size === size
              ? { ...item, quantity }
              : item
          ),
        })),
    }),

    {
      name: "cart-store",
    }
  )
);
