import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { Category } from '@prisma/client';

export const getCategoriesManage = async (userId: string) => {
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
    include: {
      _count: {
        select: {
          tasks: {
            where: {
              userId: userId,
            },
          },
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
  payload: Pick<Category, 'color' | 'name'>,
  userId: string
) => {
  const { name, color } = payload;

  if (!name || !color) {
    throw new HttpError(400, 'Name and color are required.');
  }

  const normalizedName = name.trim();
  if (normalizedName.length === 0) {
    throw new HttpError(400, 'Category name cannot be empty.');
  }

  const count = await prisma.category.count({
    where: {
      OR: [
        {
          userId: userId,
        },
      ],
    },
  });

  if (count > 20) {
    throw new HttpError(
      409,
      'Cannot create a new category. The maximum of 20 has been reached.'
    );
  }

  const existing = await prisma.category.findFirst({
    where: {
      userId: userId,
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
      userId: userId,
    },
  });

  return category;
};
