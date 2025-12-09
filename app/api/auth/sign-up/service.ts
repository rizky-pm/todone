import { hashPassword } from '@/app/lib/auth';
import { prisma } from '@/app/lib/db';
import { HttpError } from '@/lib/errors';

export const signUpUser = async (payload: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const { fullName, email, password } = payload;

  if (!fullName || !email || !password) {
    throw new HttpError(
      400,
      'Bad request, full name, email and password is required'
    );
  }

  const exists = await prisma.user.findUnique({ where: { email } });

  if (exists) {
    throw new HttpError(400, 'Bad request, email already registered');
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashed,
    },
  });

  return user;
};
