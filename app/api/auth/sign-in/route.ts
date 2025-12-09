import { NextResponse, NextRequest } from 'next/server';
import { signInUser } from './service';
import { HttpError } from '@/lib/errors';

export async function POST(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const body = await req.json();

    const response = await signInUser(body);

    return NextResponse.json(
      {
        success: true,
        message: `Success sign in user`,
        data: response,
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
