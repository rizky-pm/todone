import { prisma } from '@/app/lib/db';
import { getCurrentUser } from '@/app/lib/auth';

export const getCategories = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const categories = await prisma.category.findMany({
    where: {
      OR: [
        {
          userId: user.id,
        },
        {
          userId: null,
        },
      ],
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return categories;
};
