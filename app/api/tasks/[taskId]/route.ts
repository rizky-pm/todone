import { NextRequest, NextResponse } from 'next/server';
import { getTaskById, updateTask } from './service';
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const taskId = (await params).taskId;
  try {
    const body = await req.json();
    const updatedTask = await updateTask(body, taskId);

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
