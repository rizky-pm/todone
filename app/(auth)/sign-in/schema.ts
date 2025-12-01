import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .email({
      error: (issue) => {
        if (issue.code === 'invalid_format') {
          return 'Ivalid email address';
        }
      },
    })
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Email is required';
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

export type TypeSignInSchema = z.infer<typeof signInSchema>;
