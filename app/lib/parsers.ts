import { TaskStatus, TaskPriority } from '@/src/generated/enums';

export const parseTaskStatus = (
  value: string | null
): TaskStatus | undefined => {
  if (!value) return undefined;

  const validValues = Object.values(TaskStatus) as string[];
  return validValues.includes(value) ? (value as TaskStatus) : undefined;
};

export const parseTaskPriority = (
  value: string | null
): TaskPriority | undefined => {
  if (!value) return undefined;

  const validValues = Object.values(TaskPriority) as string[];
  return validValues.includes(value) ? (value as TaskPriority) : undefined;
};
