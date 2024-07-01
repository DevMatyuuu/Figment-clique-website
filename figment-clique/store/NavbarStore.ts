import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NavbarState {
  active: number
  setActive: (id: number) => void
}

const useNavbarStore = create<NavbarState>()(
  persist(
  (set) => ({
  active: 1,
  setActive: (id) => set({ active: id }),
}), 
  { name: 'navbarStore' },
  )
)

export default useNavbarStore;