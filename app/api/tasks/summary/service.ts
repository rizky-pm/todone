import { prisma } from '@/app/lib/db';
import dayjs from 'dayjs';

export const getSummary = async (userId: string) => {
  const now = dayjs().toDate();

  const [total, completed, incomplete, overdue] = await Promise.all([
    prisma.task.count({
      where: { userId: userId },
    }),

    prisma.task.count({
      where: {
        userId: userId,
        completedAt: { not: null },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
        completedAt: null,
        dueDate: { gte: now },
      },
    }),
    prisma.task.count({
      where: {
        userId: userId,
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
