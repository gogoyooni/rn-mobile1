import { create } from "zustand";

const useCartStore = create((set) => ({
  products: [],
  total: 0,
  addProduct: (product) =>
    set((state) => {
      const hasProduct = state.products.find((p) => p.id === product.id);
      state.total += +product.product_price;

      if (hasProduct) {
        return {
          products: state.products.map((p) => {
            if (p.id === product.id) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          }),
        };
      } else {
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        };
      }
    }),
  reduceProduct: (product) =>
    set((state) => {
      state.total -= +product.product_price;
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          })
          .filter((p) => p.quantity > 0),
      };
    }),
  clearCart: () =>
    set((state) => {
      state.total = 0;
      return {
        products: [],
      };
    }),
}));

export default useCartStore;
