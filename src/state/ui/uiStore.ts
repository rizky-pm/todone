import { create } from 'zustand';

interface UiState {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  setIsSignInModalOpen: (isSignInModalOpen: boolean) => void;
  setIsSignUpModalOpen: (isSignUpModalOpen: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useUiStore = create<UiState>((set) => ({
  isSignInModalOpen: false,
  isSignUpModalOpen: false,
  setIsSignInModalOpen: (isSignInModalOpen) => set({ isSignInModalOpen }),
  setIsSignUpModalOpen: (isSignUpModalOpen) => set({ isSignUpModalOpen }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useUiStore;
