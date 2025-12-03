import { NextResponse } from 'next/server';
import { getCategories } from './service';

export async function GET() {
  try {
    const categories = await getCategories();

    return NextResponse.json(
      {
        success: true,
        message: 'Success retrieve categories data',
        data: categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/categories error:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
