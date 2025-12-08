import { api } from '@/app/api';
import { IBaseResponse } from '@/app/types';
import { Category } from '@/src/generated/client';
import { useQuery } from '@tanstack/react-query';

interface IGetCategoriesResponse extends IBaseResponse {
  data: Category[];
}

export const useGetCategoriesQuery = (params?: {
  initialData?: Category[];
}) => {
  return useQuery({
    queryKey: ['categories.get-all'],
    queryFn: async () => {
      const response = await api.get<IGetCategoriesResponse>('api/categories');
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
