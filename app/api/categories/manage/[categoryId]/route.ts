import { HttpError } from '@/lib/errors';
import { NextRequest, NextResponse } from 'next/server';
import { deleteCategoryById, updateCategoryById } from './service';
import { safeJson } from '@/app/lib/parsers';

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) {
  const url = req.url;
  const path = new URL(url).pathname;
  const categoryId = (await params).categoryId;
  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    await deleteCategoryById(categoryId, userId);

    return NextResponse.json(
      {
        success: true,
        message: `Success delete category`,
        data: null,
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

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) {
  const url = req.url;
  const path = new URL(url).pathname;

  const categoryId = (await params).categoryId;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const body = await safeJson(req);
    const updatedCategory = updateCategoryById(categoryId, userId, body);

    return NextResponse.json(
      {
        success: true,
        message: `Success update category`,
        data: updatedCategory,
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
