import { api } from '@/app/api';
import { IBaseResponse, IPaginationMeta, ISummary } from '@/app/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Prisma } from '@/src/generated/client';

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
}) => {
  return useQuery({
    queryKey: ['task.get-all', params.page, params.limit],
    queryFn: async () => {
      const { page, limit } = params;

      const response = await api.get<IGetTasksResponse>(
        `api/tasks?page=${page}&limit=${limit}`
      );

      return response.data;
    },
    enabled: params.page > 1,
    placeholderData: keepPreviousData,
    initialData: {
      success: true,
      message: 'Sucess retrieving task list',
      data: params.initialData,
      meta: params.meta,
    },
    staleTime: 5000,
  });
};
