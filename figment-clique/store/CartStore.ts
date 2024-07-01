import { create } from 'zustand'

interface CartState {
  isCartOpen: boolean,
  setCartOpen: () => void
  setCartClose: () => void
}

const useCartStore = create<CartState>()(
  (set) => ({
  isCartOpen: false,
  setCartOpen: () => set({ isCartOpen: true }),
  setCartClose: () => set({ isCartOpen: false }),
}))

export default useCartStore;