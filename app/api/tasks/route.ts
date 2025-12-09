import { NextRequest, NextResponse } from 'next/server';
import { createTask, getTasks } from './service';
import { parseTaskPriority, parseTaskStatus } from '@/app/lib/parsers';
import { HttpError } from '@/lib/errors';

export async function GET(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const categoryId = searchParams.get('categoryId') || undefined;
    const status = parseTaskStatus(searchParams.get('status'));
    const priority = parseTaskPriority(searchParams.get('priority'));

    const { tasks, meta } = await getTasks(
      {
        page,
        limit,
        categoryId,
        status,
        priority,
      },
      userId
    );

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

export async function POST(req: NextRequest) {
  const url = req.url;
  const path = new URL(url).pathname;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const body = await req.json();

    const task = await createTask(body, userId);

    return NextResponse.json(
      {
        success: true,
        message: 'Success create new task',
        data: task,
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
