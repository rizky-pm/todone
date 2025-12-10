import { safeJson } from '@/app/lib/parsers';
import { HttpError } from '@/lib/errors';
import { NextRequest, NextResponse } from 'next/server';
import { changePassword } from './service';

export async function PATCH(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');
    const body = await safeJson(req);

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const userNewPassword = await changePassword(body, userId);

    return userNewPassword;
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
