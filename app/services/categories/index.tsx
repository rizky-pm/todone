import { api } from '@/app/api';
import { IBaseResponse } from '@/app/types';
import { CategoryWithTaskCount } from '@/components/CategoryTable';
import { Category } from '@/src/generated/client';
import { useMutation, useQuery } from '@tanstack/react-query';

interface IGetCategoriesResponse extends IBaseResponse {
  data: Category[];
}

interface IGetCategoriesManageResponse extends IBaseResponse {
  data: CategoryWithTaskCount[];
}

export const useGetCategoriesQuery = (params?: {
  initialData?: Category[];
}) => {
  return useQuery({
    queryKey: ['categories.get-all'],
    queryFn: async () => {
      const response = await api.get<IGetCategoriesResponse>('/api/categories');
      return response.data;
    },
    ...(params?.initialData && {
      initialData: {
        success: true,
        message: 'Success retrieving categories data',
        data: params.initialData,
      },
    }),
    staleTime: 500,
  });
};

export const useGetCategoriesManageQuery = (params?: {
  initialData?: CategoryWithTaskCount[];
}) => {
  return useQuery({
    queryKey: ['categories.get-all-manage'],
    queryFn: async () => {
      const response = await api.get<IGetCategoriesManageResponse>(
        '/api/categories/manage'
      );

      return response.data;
    },
    ...(params?.initialData && {
      initialData: {
        success: true,
        message: 'Success retrieving categories data',
        data: params.initialData,
      },
    }),
    staleTime: 500,
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ['categories.create-new'],
    mutationFn: async (payload: Pick<Category, 'name' | 'color'>) => {
      const response = await api.post('/api/categories/manage', payload);

      return response.data;
    },
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: ['categories.update'],
    mutationFn: async ({
      body,
      categoryId,
    }: {
      body: {
        name?: string;
        color?: string;
      };
      categoryId: string;
    }) => {
      const response = await api.patch(
        `/api/categories/manage/${categoryId}`,
        body
      );

      return response.data;
    },
  });
};

export const useDeleteCategoryByIdMutation = () => {
  return useMutation({
    mutationKey: ['categories.delete-by-id'],
    mutationFn: async (categoryId: string) => {
      const response = await api.delete(`/api/categories/manage/${categoryId}`);

      return response.data;
    },
  });
};
