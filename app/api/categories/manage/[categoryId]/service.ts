import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';

export const deleteCategoryById = async (
  categoryId: string,
  userId: string
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
      userId: userId,
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
      userId: userId,
    },
  });
};

export const updateCategoryById = async (
  categoryId: string,
  userId: string,
  payload: {
    name?: string;
    color?: string;
  }
) => {
  if (!categoryId) {
    throw new HttpError(400, 'Bad request, category id is required');
  }

  const { name, color } = payload;

  if (!name || !color) {
    throw new HttpError(400, 'Bad, request, Name and color is required');
  }

  const category = await prisma.category.findFirst({
    where: { userId: userId, id: categoryId },
  });

  if (!category) {
    throw new HttpError(404, 'Category not found');
  }

  const updatedCategory = await prisma.category.update({
    where: {
      userId: userId,
      id: categoryId,
    },
    data: payload,
  });

  return updatedCategory;
};
