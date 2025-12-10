'use client';

import { create } from 'zustand';
import { User } from '@/src/generated/client';

interface IAuthState {
  user: Pick<User, 'id' | 'email' | 'fullName' | 'image'> | null;
  setUser: (user: Pick<User, 'id' | 'email' | 'fullName' | 'image'>) => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
