import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import dayjs from 'dayjs';

export const getSummary = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const now = dayjs().toDate();

  const [total, completed, incomplete, overdue] = await Promise.all([
    prisma.task.count({
      where: { userId: user.id },
    }),

    prisma.task.count({
      where: {
        userId: user.id,
        completedAt: { not: null },
      },
    }),
    prisma.task.count({
      where: {
        userId: user.id,
        completedAt: null,
        dueDate: { gte: now },
      },
    }),
    prisma.task.count({
      where: {
        userId: user.id,
        completedAt: null,
        dueDate: { lt: now },
      },
    }),
  ]);

  return {
    total,
    completed,
    incomplete,
    overdue,
  };
};
