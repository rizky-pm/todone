import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { TaskStatus } from '@/src/generated/enums';
import dayjs from 'dayjs';

export const getSummary = async () => {
  const user = await getCurrentUser();

  if (!user) {
    if (!user) throw new Error('Unauthorized');
  }

  const now = dayjs().toDate();

  const [total, completed, incomplete, overdue] = await Promise.all([
    prisma.task.count({
      where: { userId: user.id },
    }),

    prisma.task.count({
      where: {
        userId: user.id,
        status: TaskStatus.COMPLETE,
      },
    }),

    prisma.task.count({
      where: {
        userId: user.id,
        status: TaskStatus.INCOMPLETE,
      },
    }),

    prisma.task.count({
      where: {
        userId: user.id,
        status: TaskStatus.INCOMPLETE,
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
