import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';

export const getTasks = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  if (page < 1 || limit < 1) {
    throw new Error('invalid-pagination-values');
  }

  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where: { userId: user.id },
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
    prisma.task.count({ where: { userId: user.id } }),
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
