import { create } from 'zustand';

interface PhotoStore {
  photoUri: string | null;
  setPhotoUri: (uri: string) => void;
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  photoUri: null,
  setPhotoUri: (uri) => set({ photoUri: uri }),
}));
