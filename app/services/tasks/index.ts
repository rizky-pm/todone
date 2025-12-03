import { api } from '@/app/api';
import { IBaseResponse, IPaginationMeta, ISummary } from '@/app/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Prisma, TaskPriority, TaskStatus } from '@/src/generated/client';
import { IFilterState } from '@/app/store/filter.store';

export type TaskWithCategory = Prisma.TaskGetPayload<{
  include: {
    category: {
      select: {
        id: true;
        name: true;
        color: true;
      };
    };
  };
}>;

interface IGetTasksResponse extends IBaseResponse {
  data: TaskWithCategory[];
  meta: IPaginationMeta;
}

interface IGetTaskSummaryResponse extends IBaseResponse {
  data: ISummary;
}

export const useGetTaskSummaryQuery = (initialData: ISummary) => {
  return useQuery({
    queryKey: ['task.get-summary'],
    queryFn: async () => {
      const response = await api.get<IGetTaskSummaryResponse>(
        'api/tasks/summary'
      );

      return response.data;
    },
    initialData: {
      success: true,
      message: 'Sucess retrieving summary data',
      data: initialData,
    },
    staleTime: 5000,
  });
};

export const useGetTaskQuery = (params: {
  page: number;
  limit: number;
  initialData: TaskWithCategory[];
  meta: IPaginationMeta;
  filter: Pick<IFilterState, 'category' | 'priority' | 'status'>;
  applySignal: number;
}) => {
  return useQuery({
    queryKey: ['task.get-all', params.page, params.limit, params.applySignal],
    queryFn: async () => {
      const { page, limit, filter } = params;

      const response = await api.get<IGetTasksResponse>(`api/tasks`, {
        params: {
          page: page,
          limit: limit,
          categoryId: filter.category,
          status: filter.status,
          priority: filter.priority,
        },
      });

      return response.data;
    },
    placeholderData: keepPreviousData,
    initialData:
      params.page === 1
        ? {
            success: true,
            message: 'Sucess retrieving task list',
            data: params.initialData,
            meta: params.meta,
          }
        : undefined,
  });
};
