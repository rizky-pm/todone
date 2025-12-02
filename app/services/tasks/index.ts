import { api } from '@/app/api';
import { IBaseResponse, ISummary } from '@/app/types';
import { useQuery } from '@tanstack/react-query';
import type { Task } from '@/src/generated/client';

interface IGetTasksResponse extends IBaseResponse {
  data: Task[];
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

export const useGetTaskQuery = (params: { page: number; limit: number }) => {
  return useQuery({
    queryKey: ['task.get-all', params.page, params.limit],
    queryFn: async () => {
      const { page, limit } = params;

      const response = await api.get<IGetTasksResponse>(
        `api/tasks?page${page}&limit=${limit}`
      );

      return response.data;
    },
  });
};
