import { TypeSignInSchema } from '@/app/(auth)/sign-in/schema';
import { TypeSignUpSchema } from '@/app/(auth)/sign-up/schema';
import { api } from '@/app/api';
import { useMutation } from '@tanstack/react-query';

export const useSignUpMutation = () => {
  return useMutation({
    mutationKey: ['auth.sign-up'],
    mutationFn: async (data: TypeSignUpSchema) => {
      const res = api.post('api/auth/sign-up', data);

      return res;
    },
  });
};

export const useSignInMutation = () => {
  return useMutation({
    mutationKey: ['auth.sign-in'],
    mutationFn: async (data: TypeSignInSchema) => {
      const res = api.post('api/auth/sign-in', data);

      return res;
    },
  });
};

export const useSignOutMutation = () => {
  return useMutation({
    mutationKey: ['auth.sign-out'],
    mutationFn: async () => {
      const res = await api.post('api/auth/sign-out');

      return res;
    },
  });
};
