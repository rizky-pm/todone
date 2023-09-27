import { create } from 'zustand';

interface UiState {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  setIsSignInModalOpen: (isSignInModalOpen: boolean) => void;
  setIsSignUpModalOpen: (isSignUpModalOpen: boolean) => void;
}

const useUiStore = create<UiState>((set) => ({
  isSignInModalOpen: false,
  isSignUpModalOpen: false,
  setIsSignInModalOpen: (isSignInModalOpen) => set({ isSignInModalOpen }),
  setIsSignUpModalOpen: (isSignUpModalOpen) => set({ isSignUpModalOpen }),
}));

export default useUiStore;
