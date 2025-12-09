import { NextRequest, NextResponse } from 'next/server';
import { getCategories } from './service';
import { HttpError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const categories = await getCategories(userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Success retrieve categories data',
        data: categories,
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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
