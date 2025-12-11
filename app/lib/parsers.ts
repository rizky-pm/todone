import { TaskPriority } from '@prisma/client';
import { TaskStatus } from '@/app/types';
import { NextRequest } from 'next/server';

export const parseTaskStatus = (
  value: string | null
): TaskStatus | undefined => {
  if (!value) return undefined;

  if (Object.hasOwn(TaskStatus, value)) {
    return TaskStatus[value as keyof typeof TaskStatus];
  }

  return undefined;
};

export const parseTaskPriority = (
  value: string | null
): TaskPriority | undefined => {
  if (!value) return undefined;

  const validValues = Object.values(TaskPriority) as string[];
  return validValues.includes(value) ? (value as TaskPriority) : undefined;
};

export async function safeJson(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
