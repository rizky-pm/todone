import { NextRequest, NextResponse } from 'next/server';
import { getSummary } from './service';
import { HttpError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { total, completed, incomplete, overdue } = await getSummary(userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Success retrieve tasks data',
        data: {
          total,
          completed,
          incomplete,
          overdue,
        },
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
