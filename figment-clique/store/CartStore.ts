import { Cart } from '@/types';
import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartState {
  cart: Cart[],
  itemsAmount: number;
  total: number;
  quantity: number;
  selectedSize: string,
  setSelectedSize: (value: string) => void
  addToCart: (item: Cart) => void,
  removeFromCart: (id: string) => void,
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  calculateTotal: () => number;
  clearCart: () => void;
  setTotal: (total: number) => void;
}

const useCartStore = create<CartState>()(
  persist(
  (set) => ({
  cart: [],
  itemsAmount: 0,
  total: 0,
  quantity: 0,
  selectedSize: '',

  setSelectedSize: (value) => set({ selectedSize: value}),

  setTotal: (total) => set({ total: total }),
  
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) =>
          cartItem.title === item.title && cartItem.size === state.selectedSize
      );
  
      if (existingItem) {
        const updatedCart = state.cart.map((cartItem) =>
          cartItem.title === item.title && cartItem.size === state.selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
        return { cart: updatedCart };
      } else {
        const newItem = {
          ...item,
          id: uuidv4(),
          size: state.selectedSize,
          quantity: 1,
        };
        return {
          cart: [...state.cart, newItem],
        };
      }
    });
  },
  
  removeFromCart: (id) => {
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
  },

  increment: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { cart: updatedCart };
    });
  },

  decrement: (itemId) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      return { cart: updatedCart };
    });
  },

  calculateTotal: (): number => {
    return useCartStore.getState().cart.reduce((acc: number, item: Cart) => {
      return acc + item.price * item.quantity;
    }, 0);
  },

  clearCart: () => {
    set({ cart: [] });
  },

}),
  {
    name: 'cart-storage',
    storage: createJSONStorage(() => localStorage), 
  },
));

export default useCartStore;