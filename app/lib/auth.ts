import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { prisma } from './db';

const JWT_SECRET = process.env.JWT_SECRET;

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: '1h' });
};

export function verifyToken(token?: string) {
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET!);

    if (typeof decoded !== 'object' || !('userId' in decoded)) {
      return null;
    }

    return { id: (decoded as JwtPayload & { userId: string }).userId };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: string;
  };

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      image: true,
    },
  });

  return user;
}
