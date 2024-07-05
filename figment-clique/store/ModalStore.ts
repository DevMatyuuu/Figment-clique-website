import { create } from 'zustand'

interface ModalState {
  //cart modal
  isCartOpen: boolean,
  setCartOpen: () => void
  setCartClose: () => void
  //mobile nav modal
  isNavModalOpen: boolean,
  setNavModalOpen: (newState: boolean) => void
  setNavModalClose: () => void
  //search modal
  isSearchModalOpen: boolean,
  setSearchModalOpen: () => void
  setSearchModalClose: () => void
}

const useModalStore = create<ModalState>()(
  (set) => ({
  //cart modal state
  isCartOpen: false,
  setCartOpen: () => set({ isCartOpen: true }),
  setCartClose: () => set({ isCartOpen: false }),

  //mobile nav modal state
  isNavModalOpen: false,
  setNavModalOpen: (newState) => set({ isNavModalOpen: newState}),
  setNavModalClose: () => set({ isNavModalOpen: false }),

  //search modal state
  isSearchModalOpen: false,
  setSearchModalOpen: () => set({ isSearchModalOpen: true}),
  setSearchModalClose: () => set({ isSearchModalOpen: false }),
}))

export default useModalStore;