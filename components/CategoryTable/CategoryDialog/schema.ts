import { z } from 'zod';

export const formCategorySchema = z.object({
  name: z
    .string()
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Category name is required';
        }
      },
    })
    .max(15, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Maximum 15 characters allowed.';
        }
      },
    }),
  color: z
    .string()
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Color is required';
        }
      },
    })
    .max(7, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Invalid hex color format.';
        }
      },
    }),
});

export type FormCategorySchema = z.infer<typeof formCategorySchema>;
