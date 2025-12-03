import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { TaskStatus } from '@/app/types';
import { Prisma } from '@/src/generated/client';
import { TaskPriority } from '@/src/generated/enums';
import dayjs from 'dayjs';

export const getTasks = async ({
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
}) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (page < 1 || limit < 1) {
    throw new Error('invalid-pagination-values');
  }

  const skip = (page - 1) * limit;

  const whereOptions: Prisma.TaskWhereInput = {
    userId: user.id,
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
