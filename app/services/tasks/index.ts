import { api } from '@/app/api';
import { IBaseResponse, IPaginationMeta, ISummary } from '@/app/types';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import type { Prisma, TaskPriority } from '@prisma/client';
import { IFilterState } from '@/app/store/filter.store';
import _ from 'lodash';
import { TypeTaskFormSchema } from '@/app/(protected)/task/schema';

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

      const response = await api.get<IGetTasksResponse>(`/api/tasks`, {
        params: {
          page: page,
          limit: limit,
          categoryId: filter.category,
          status: _.toUpper(filter.status),
          priority: _.toUpper(filter.priority),
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

export const useGetTaskById = ({ taskId }: { taskId: string }) => {
  return useQuery({
    queryKey: ['task.get-by-id', taskId],
    queryFn: async () => {
      const response = await api.get(`/api/tasks/${taskId}`);

      return response.data;
    },
  });
};

export const useCreateTaskMutation = () => {
  return useMutation({
    mutationKey: ['task.create-task'],
    mutationFn: async (payload: TypeTaskFormSchema) => {
      const response = await api.post('/api/tasks', payload);

      return response.data;
    },
  });
};

export const useUpdateTask = () => {
  return useMutation({
    mutationKey: ['task.update-task'],
    mutationFn: async ({
      payload,
      taskId,
    }: {
      payload?: {
        title?: string;
        description?: string;
        categoryId?: string;
        priority?: TaskPriority;
        dueDate?: Date;
      };
      taskId: string;
    }) => {
      const response = await api.patch(`/api/tasks/${taskId}`, payload);

      return response.data;
    },
  });
};

export const useDeleteTask = () => {
  return useMutation({
    mutationKey: ['task.delete-task'],
    mutationFn: async ({ taskId }: { taskId: string }) => {
      const response = await api.delete(`/api/tasks/${taskId}`);

      return response.data;
    },
  });
};
