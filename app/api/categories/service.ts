import { prisma } from '@/app/lib/db';

export const getCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        {
          userId: userId,
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
