import { NextRequest, NextResponse } from 'next/server';
import { createCategory, getCategoriesManage } from './service';
import { HttpError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const categories = await getCategoriesManage(userId);

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

export async function POST(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const body = await req.json();
    const category = await createCategory(body, userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Success create new category',
        data: category,
      },
      { status: 201 }
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
