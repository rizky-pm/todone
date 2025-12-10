import { comparePassword, hashPassword, signToken } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { NextResponse } from 'next/server';

export const changePassword = async (
  payload: {
    oldPassword: string;
    newPassword: string;
  },
  userId: string
) => {
  const { oldPassword, newPassword } = payload;

  if (!oldPassword || !newPassword) {
    throw new HttpError(
      400,
      'Bad request, old password and new password is required'
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const match = await comparePassword(oldPassword, user.password);

  if (!match) {
    throw new HttpError(400, 'Invalid old password');
  }

  const newHashedPassword = await hashPassword(newPassword);

  const userNewPassword = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: newHashedPassword,
    },
  });

  const token = signToken({ userId });

  const response = NextResponse.json({
    message: 'Success change password',
    user: {
      id: userNewPassword.id,
      email: userNewPassword.email,
      fullName: userNewPassword.fullName,
      image: userNewPassword.image,
      imageKey: userNewPassword.imageKey,
    },
  });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
};
