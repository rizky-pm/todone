import { NextRequest, NextResponse } from 'next/server';
import { getTasks } from './service';
import { parseTaskPriority, parseTaskStatus } from '@/app/lib/parsers';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryId = searchParams.get('categoryId') || undefined;
    const status = parseTaskStatus(searchParams.get('status'));
    const priority = parseTaskPriority(searchParams.get('priority'));

    const { tasks, meta } = await getTasks({
      page,
      limit,
      categoryId,
      status,
      priority,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Success retrieve tasks data',
        data: tasks,
        meta: meta,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET /api/tasks error:', error);

    if (error instanceof Error) {
      if (error.message === 'Unauthorized') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      if (error.message === 'invalid-pagination-values') {
        return NextResponse.json(
          { error: 'Invalid pagination values' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
