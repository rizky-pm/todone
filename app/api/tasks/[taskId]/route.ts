import { NextRequest, NextResponse } from 'next/server';
import { deleteTaskById, getTaskById, updateTask } from './service';
import { HttpError } from '@/lib/errors';

export async function GET({ params }: { params: { taskId: string } }) {
  try {
    const task = await getTaskById(params.taskId);

    return NextResponse.json({
      success: true,
      message: `Success retrieve data of task id ${params.taskId}`,
      data: task,
    });
  } catch (error) {
    console.error('GET /api/tasks/[taskId] error:', error);

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

async function safeJson(req: NextRequest) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const taskId = (await params).taskId;
  try {
    const body = await safeJson(req);
    const updatedTask = await updateTask(taskId, body);

    return NextResponse.json(
      {
        success: true,
        message: `Success update task`,
        data: updatedTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('PATCH /api/tasks/[taskId] error:', error);

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
  const taskId = (await params).taskId;

  try {
    await deleteTaskById(taskId);

    return NextResponse.json(
      {
        success: true,
        message: `Success delete task`,
        data: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/tasks/[taskId] error:', error);

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
