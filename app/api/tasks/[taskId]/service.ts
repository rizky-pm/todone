import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { TaskPriority } from '@/src/generated/enums';

export const getTaskById = async (taskId: string, userId: string) => {
  if (!taskId) {
    throw new HttpError(400, 'Bad request, task id is required');
  }

  const task = await prisma.task.findFirst({
    where: {
      userId: userId,
      id: taskId,
    },
  });

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  return task;
};

export const updateTask = async (
  taskId: string,
  userId: string,
  payload?: {
    title?: string;
    description?: string;
    categoryId?: string;
    priority?: TaskPriority;
    dueDate?: Date;
  }
) => {
  if (!taskId) {
    throw new HttpError(400, 'Bad request, task id is required');
  }

  const task = await getTaskById(taskId, userId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  let updatedTask;

  if (payload) {
    updatedTask = await prisma.task.update({
      where: {
        userId: userId,
        id: taskId,
      },
      data: payload,
    });
  } else {
    const isCompleting = task.completedAt == null;

    updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        completedAt: isCompleting ? new Date() : null,
      },
    });
  }

  return updatedTask;
};

export const deleteTaskById = async (taskId: string, userId: string) => {
  if (!taskId) {
    throw new HttpError(400, 'Bad request, task id is required');
  }

  const task = await getTaskById(taskId, userId);

  if (!task) {
    throw new HttpError(404, 'Task not found');
  }

  await prisma.task.delete({
    where: {
      userId: userId,
      id: taskId,
    },
  });
};
