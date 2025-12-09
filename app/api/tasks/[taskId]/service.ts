import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { TaskPriority } from '@/src/generated/enums';

export const getTaskById = async (taskId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  if (!taskId) {
    throw new HttpError(400, 'Bad request');
  }

  const task = await prisma.task.findFirst({
    where: {
      userId: user.id,
      id: taskId,
    },
  });

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return task;
};

export const updateTask = async (
  payload: {
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: TaskPriority;
    dueDate?: Date;
  },
  taskId: string
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  if (!taskId) {
    throw new HttpError(400, 'Bad request');
  }

  const task = await getTaskById(taskId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  const updatedTask = await prisma.task.update({
    where: {
      userId: user.id,
      id: taskId,
    },
    data: payload,
  });

  return updatedTask;
};
