// catalogStore.ts

import { catalogProps } from '@/types';
import create from 'zustand';

interface CatalogState {
  catalogItems: catalogProps[];
  loading: boolean;
  fetchCatalogData: () => Promise<void>;
}

const useCatalogStore = create<CatalogState>((set) => ({
  catalogItems: [],
  loading: true,

  fetchCatalogData: async () => {
    try {
      const response = await fetch('/api/catalog');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      set({ catalogItems: data, loading: false });
    } catch (error) {
      console.error('Error fetching catalog data', error);
      set({ loading: false });
    }
  },
}));

export default useCatalogStore;
