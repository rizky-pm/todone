import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/app/lib/db';
import { comparePassword, signToken } from '@/app/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Some fields are empty' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        {
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    const match = comparePassword(password, user.password);

    if (!match) {
      return NextResponse.json(
        {
          message: 'Invalid credentials',
        },
        { status: 401 }
      );
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
  } catch (error) {
    console.error('Sign in error:', error);
    console.error(error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
