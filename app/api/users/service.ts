import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { UTApi } from 'uploadthing/server';

export const utapi = new UTApi();

export const updateUser = async (
  payload: {
    image?: string;
    fullName?: string;
  },
  userId: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  if (user.imageKey) {
    await utapi.deleteFiles(user.imageKey);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: payload,
  });

  return updatedUser;
};
