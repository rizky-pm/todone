import { NextResponse, NextRequest } from 'next/server';
import { signUpUser } from './service';
import { HttpError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const body = await req.json();

    const user = await signUpUser(body);

    return NextResponse.json(
      {
        success: true,
        message: `Success create user`,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`${req.method} ${path} error:`, error);

    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
