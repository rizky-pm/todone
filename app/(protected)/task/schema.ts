import { TaskPriority } from '@/src/generated/enums';
import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      error: (issue) => {
        if (issue.code === 'too_small') {
          return 'Task title is required';
        }
      },
    })
    .max(20, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Maximum 20 characters allowed.';
        }
      },
    }),
  description: z
    .string()
    .max(255, {
      error: (issue) => {
        if (issue.code === 'too_big') {
          return 'Maximum 255 characters allowed.';
        }
      },
    })
    .optional(),
  categoryId: z.string().min(1, {
    error: (issue) => {
      if (issue.code === 'too_small') {
        return 'Task title is required';
      }
    },
  }),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH], {
    error: (issue) => {
      if (issue.code === 'invalid_value') {
        return 'Task priority is required';
      }
    },
  }),
  dueDate: z
    .date({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Due date is required';
        }
      },
    })
    .refine(
      (date) => {
        return date > new Date();
      },
      {
        message: 'Due date must be in the future.',
      }
    ),
});

export type TypeTaskFormSchema = z.infer<typeof taskFormSchema>;
