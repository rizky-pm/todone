import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Full name is required';
      }
    },
  }),
  email: z
    .string()
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Email is required';
        }
      },
    })
    .email({
      error: (issue) => {
        if (issue.code === 'invalid_format') {
          return 'Ivalid email address';
        }
      },
    }),
  password: z.string().min(6, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Password must be at least 6 characters';
      }
    },
  }),
});

export type TypeSignUpSchema = z.infer<typeof signUpSchema>;
