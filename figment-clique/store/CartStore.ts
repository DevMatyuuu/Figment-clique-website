import { Cart } from '@/types';
import { create } from 'zustand'

interface CartState {
  cart: Cart[],
  itemsAmount: number;
  total: number;
  amount: number;
  addToCart: (item: Cart) => void,
  removeFromCart: (id: string) => void,
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  calculateTotal: () => number;
  clearCart: () => void;
  setTotal: (total: number) => void;
}

const useCartStore = create<CartState>()(
  (set) => ({
  cart: [],
  itemsAmount: 0,
  total: 0,
  amount: 0,

  setTotal: (total) => set({ total: total }),
  
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, amount: cartItem.amount + 1 } : cartItem
        );
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, { ...item, amount: 1 }] };
      }
    });
  },

  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
  },

  increment: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, amount: item.amount + 1 } : item
      );
      return { cart: updatedCart };
    });
  },

  decrement: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
      );
      return { cart: updatedCart };
    });
  },

  calculateTotal: (): number => {
    return useCartStore.getState().cart.reduce((acc: number, item: Cart) => {
      return acc + item.price * item.amount;
    }, 0);
  },

  clearCart: () => {
    set({ cart: [] });
  },

}));

export default useCartStore;