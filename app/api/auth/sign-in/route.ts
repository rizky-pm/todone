import { NextResponse, NextRequest } from 'next/server';
import { signInUser } from './service';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const response = await signInUser(payload);

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
