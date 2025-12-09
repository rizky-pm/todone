import { getCurrentUser } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';

export const deleteCategoryById = async (categoryId: string) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
      userId: user.id,
    },
    include: {
      _count: { select: { tasks: true } },
    },
  });

  if (!category) {
    throw new HttpError(404, 'Not found');
  }

  if (category._count.tasks > 0) {
    throw new HttpError(409, 'Category has tasks and cannot be deleted');
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
      userId: user.id,
    },
  });
};

export const updateCategoryById = async (
  categoryId: string,
  payload: {
    name?: string;
    color?: string;
  }
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new HttpError(401, 'Unauthorized');
  }

  if (!categoryId) {
    throw new HttpError(400, 'Bad request');
  }

  const { name, color } = payload;

  if (!name || !color) {
    throw new HttpError(400, 'Name and color is required');
  }

  const category = await prisma.category.findFirst({
    where: { userId: user.id, id: categoryId },
  });

  if (!category) {
    throw new HttpError(404, 'Category not found');
  }

  const updatedCategory = await prisma.category.update({
    where: {
      userId: user.id,
      id: categoryId,
    },
    data: payload,
  });

  return updatedCategory;
};
