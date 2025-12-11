import { NextRequest, NextResponse } from 'next/server';
import { deleteTaskById, getTaskById, updateTask } from './service';
import { HttpError } from '@/lib/errors';
import { safeJson } from '@/app/lib/parsers';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const url = req.url;
  const path = new URL(url).pathname;
  const taskId = (await params).taskId;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const task = await getTaskById(taskId, userId);

    return NextResponse.json({
      success: true,
      message: `Success retrieve data of task id ${taskId}`,
      data: task,
    });
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
  { params }: { params: Promise<{ taskId: string }> }
) {
  const url = req.url;
  const path = new URL(url).pathname;
  const taskId = (await params).taskId;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    const body = await safeJson(req);
    const updatedTask = await updateTask(taskId, userId, body);

    return NextResponse.json(
      {
        success: true,
        message: `Success update task`,
        data: updatedTask,
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

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ taskId: string }>;
  }
) {
  const url = req.url;
  const path = new URL(url).pathname;
  const taskId = (await params).taskId;

  try {
    const userId = req.headers.get('x-user-id');

    if (!userId) {
      throw new HttpError(401, 'Unauthorized');
    }

    await deleteTaskById(taskId, userId);

    return NextResponse.json(
      {
        success: true,
        message: `Success delete task`,
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
