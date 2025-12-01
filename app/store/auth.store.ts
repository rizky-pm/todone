'use client';

import { create } from 'zustand';
import { IUser } from '../types';

interface IAuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
