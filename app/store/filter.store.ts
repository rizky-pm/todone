'use client';

import { create } from 'zustand';
import { TaskPriority } from '@prisma/client';
import { TaskStatus } from '../types';

export interface IFilterState {
  category: string | undefined;
  status: TaskStatus | undefined;
  priority: TaskPriority | undefined;
  pageIndex: number;

  setCategory: (categoryId: string) => void;
  setStatus: (status: TaskStatus) => void;
  setPriority: (priority: TaskPriority) => void;
  setPageIndex: () => void;

  applySignal: number;
  applyFilter: () => void;
  clearFilter: () => void;
}

export const useFilterStore = create<IFilterState>((set) => ({
  category: undefined,
  status: undefined,
  priority: undefined,
  pageIndex: 1,

  setCategory: (category) => set({ category }),
  setStatus: (status) => set({ status }),
  setPriority: (priority) => set({ priority }),
  setPageIndex: () => set((state) => ({ pageIndex: state.pageIndex + 1 })),

  applySignal: 0,
  applyFilter: () =>
    set((store) => ({ applySignal: store.applySignal + 1, pageIndex: 1 })),
  clearFilter: () => {
    set({
      category: undefined,
      status: undefined,
      priority: undefined,
      pageIndex: 1,
    });
    set((store) => ({ applySignal: store.applySignal + 1 }));
  },
}));
