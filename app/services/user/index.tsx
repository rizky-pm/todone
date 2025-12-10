import { api } from '@/app/api';
import { IBaseResponse } from '@/app/types';
import { User } from '@/src/generated/client';
import { useMutation, useQuery } from '@tanstack/react-query';

export interface IGetCurrentUserResponse extends IBaseResponse {
  data: Pick<User, 'id' | 'email' | 'fullName' | 'image'>;
}

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationKey: ['user.update'],
    mutationFn: async (payload: {
      image?: string;
      fullName?: string;
      imageKey?: string;
    }) => {
      const response = await api.patch(`/api/users`, payload);

      return response.data;
    },
  });
};

export const useGetCurrentUserQuery = (params?: {
  initialData: Pick<User, 'id' | 'email' | 'fullName' | 'image'>;
}) => {
  return useQuery({
    queryKey: ['user.get'],
    queryFn: async () => {
      const response = await api.get<IGetCurrentUserResponse>('/api/users');

      return response.data;
    },

    ...(params?.initialData && {
      placeholderData: {
        success: true,
        message: 'Success retrieving current user data',
        data: params.initialData,
      },
    }),

    staleTime: 500,
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ['user.change-password'],
    mutationFn: async (payload: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const response = await api.patch('/api/users/change-password', payload);

      return response.data;
    },
  });
};
