import { prisma } from '@/app/lib/db';
import { TaskStatus } from '@/app/types';
import { HttpError } from '@/lib/errors';
import { Prisma } from '@prisma/client';
import { TaskPriority } from '@prisma/client';
import dayjs from 'dayjs';

export const getTasks = async (
  {
    page,
    limit,
    categoryId,
    status,
    priority,
  }: {
    page: number;
    limit: number;
    status?: TaskStatus | undefined;
    categoryId?: string | undefined;
    priority?: TaskPriority | undefined;
  },
  userId: string
) => {
  if (page < 1 || limit < 1) {
    throw new HttpError(400, 'Bad request, invalid page and limit value');
  }

  const skip = (page - 1) * limit;

  const whereOptions: Prisma.TaskWhereInput = {
    userId: userId,
  };

  const now = dayjs().toDate();

  switch (status) {
    case TaskStatus.COMPLETE:
      whereOptions.completedAt = { not: null };
      break;

    case TaskStatus.INCOMPLETE:
      whereOptions.completedAt = null;
      whereOptions.dueDate = { gte: now };
      break;

    case TaskStatus.OVERDUE:
      whereOptions.completedAt = null;
      whereOptions.dueDate = { lt: now };
      break;
  }

  if (categoryId) {
    whereOptions.categoryId = categoryId;
  }

  if (priority) {
    whereOptions.priority = priority;
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: whereOptions,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    }),
    prisma.task.count({ where: whereOptions }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    tasks,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export const createTask = async (
  payload: {
    title: string;
    description?: string;
    categoryId: string;
    priority: TaskPriority;
    dueDate: Date;
  },
  userId: string
) => {
  const { title, description, categoryId, priority, dueDate } = payload;

  if (!title || !categoryId || !priority || !dueDate) {
    throw new HttpError(
      400,
      'Bad request, title, category id, priority and due date is required'
    );
  }

  const task = await prisma.task.create({
    data: {
      ...payload,
      description: description ?? null,
      userId: userId,
    },
  });

  return task;
};
