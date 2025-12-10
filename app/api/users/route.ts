import { HttpError } from '@/lib/errors';
import { NextRequest, NextResponse } from 'next/server';
import { updateUser } from './service';
import { safeJson } from '@/app/lib/parsers';
import { getCurrentUser } from '@/app/lib/auth';

export async function PATCH(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;
  try {
    const userId = req.headers.get('x-user-id');
    const body = await safeJson(req);

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const updatedUser = await updateUser(body, userId);

    return NextResponse.json(
      {
        success: true,
        message: `Success update user`,
        data: updatedUser,
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

export async function GET(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;
  try {
    const user = await getCurrentUser();

    return NextResponse.json(
      {
        success: true,
        message: `Success retrieving current user data`,
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
