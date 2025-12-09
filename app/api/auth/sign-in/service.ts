import { comparePassword, signToken } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';
import { NextResponse } from 'next/server';

export const signInUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new HttpError(400, 'Invalid email or password');
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new HttpError(400, 'Invalid email or password');
  }

  const match = await comparePassword(password, user.password);

  if (!match) {
    throw new HttpError(400, 'Invalid email or password');
  }

  const token = signToken({ userId: user.id });

  const response = NextResponse.json({
    message: 'Sign in success',
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  });

  response.headers.set(
    'Set-Cookie',
    `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax; Secure=${
      process.env.NODE_ENV === 'production'
    }`
  );

  return response;
};
