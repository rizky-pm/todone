'use client';

import { create } from 'zustand';
import { TaskPriority } from '@/src/generated/enums';
import { TaskStatus } from '../types';

export interface IFilterState {
  category: string | undefined;
  status: TaskStatus | undefined;
  priority: TaskPriority | undefined;

  setCategory: (categoryId: string) => void;
  setStatus: (status: TaskStatus) => void;
  setPriority: (priority: TaskPriority) => void;

  applySignal: number;
  applyFilter: () => void;
  clearFilter: () => void;
}

export const useFilterStore = create<IFilterState>((set) => ({
  category: undefined,
  status: undefined,
  priority: undefined,

  setCategory: (category) => set({ category }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),

  applySignal: 0,
  applyFilter: () => set((store) => ({ applySignal: store.applySignal + 1 })),
  clearFilter: () => {
    set({ category: undefined, status: undefined, priority: undefined });
    set((store) => ({ applySignal: store.applySignal + 1 }));
  },
}));
