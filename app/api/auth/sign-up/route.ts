import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/app/lib/db';
import { hashPassword } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = req.json();
    const { fullName, email, password } = await body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: 'Some fields are empty' },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({
      where: { email },
    });

    if (exists) {
      return NextResponse.json(
        {
          message: 'Email is already registered',
        },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashed,
      },
    });

    return NextResponse.json({ message: 'User created', user });
  } catch (error) {
    console.error('Sign up error: ', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
