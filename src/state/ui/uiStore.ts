import { create } from 'zustand';

interface UiState {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

const useUiStore = create<UiState>((set) => ({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
}));

export default useUiStore;
