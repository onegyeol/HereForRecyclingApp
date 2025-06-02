import { create } from 'zustand';

interface PhotoStore {
  photoUri: string | null;
  setPhotoUri: (uri: string) => void;
  resultUUID: string | null;             
  setResultUUID: (uuid: string) => void; 
}

export const usePhotoStore = create<PhotoStore>((set) => ({
  photoUri: null,
  setPhotoUri: (uri) => set({ photoUri: uri }),
  resultUUID: null,                     
  setResultUUID: (uuid) => set({ resultUUID: uuid }),
}));