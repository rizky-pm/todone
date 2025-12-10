import { z } from 'zod';

export const profileFormSchema = z.object({
  email: z
    .email({
      error: (issue) => {
        if (issue.code === 'invalid_format') {
          return 'Invalid email address';
        }
      },
    })
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Email is required';
        }
      },
    })
    .max(50, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Maximum 50 characters allowed';
        }
      },
    }),
  fullName: z
    .string()
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Full name is required';
        }
      },
    })
    .max(50, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Maximum 50 characters allowed';
        }
      },
    }),
});

export const passwordFormSchema = z
  .object({
    oldPassword: z.string().min(6, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Password must be at least 6 characters';
        }
      },
    }),
    newPassword: z.string().min(6, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Password must be at least 6 characters';
        }
      },
    }),
    newPasswordConfirm: z.string().min(6, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Password must be at least 6 characters';
        }
      },
    }),
  })
  .superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['newPasswordConfirm'],
      });
    }
  });

export type TypeProfileFormSchema = z.infer<typeof profileFormSchema>;
export type TypePasswordFormSchema = z.infer<typeof passwordFormSchema>;
