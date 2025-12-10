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
    password: z
      .string()
      .min(1, {
        error: (issue) => {
          if (issue.code === 'too_small') {
            return 'Password is required';
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
    passwordConfirm: z
      .string()
      .min(1, {
        error: (issue) => {
          if (issue.code === 'too_small') {
            return 'Password confirmation is required';
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
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['passwordConfirm'],
      });
    }
  });

export type TypeProfileFormSchema = z.infer<typeof profileFormSchema>;
export type TypePasswordFormSchema = z.infer<typeof passwordFormSchema>;
