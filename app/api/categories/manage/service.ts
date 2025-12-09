import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { Category } from '@/src/generated/client';

export const getCategoriesManage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
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
    include: {
      _count: {
        select: {
          tasks: true,
        },
      },
    },
    orderBy: {
      userId: 'desc',
    },
  });

  return categories;
};

export const createCategory = async (
  payload: Pick<Category, 'color' | 'name'>
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  const { name, color } = payload;

  if (!name || !color) {
    throw new HttpError(400, 'Name and color are required.');
  }

  const normalizedName = name.trim();
  if (normalizedName.length === 0) {
    throw new HttpError(400, 'Category name cannot be empty.');
  }

  const existing = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: normalizedName,
    },
  });

  if (existing) {
    throw new HttpError(409, `A category with name ${name} already exists.`);
  }

  const category = await prisma.category.create({
    data: {
      name: normalizedName,
      color,
      userId: user.id,
    },
  });

  return category;
};
