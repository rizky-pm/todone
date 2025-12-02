import { NextResponse } from 'next/server';
import { getSummary } from './service';

export async function GET() {
  try {
    const { total, completed, incomplete, overdue } = await getSummary();

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
    console.error('GET /api/tasks/summary error:', error);

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
