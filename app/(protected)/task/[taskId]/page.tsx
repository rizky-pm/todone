import { TypographyH3, TypographyP } from '@/components/ui/typography';
import React from 'react';
import TaskForm from '../TaskForm';
import { getTaskById } from '@/app/api/tasks/[taskId]/service';

const TaskDetail = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const taskId = (await params).taskId;
  const task = await getTaskById(taskId);

  return (
    <section className='flex flex-col gap-4 my-6  shadow-sm rounded-lg p-4'>
      <div className=''>
        <TypographyH3>Add New Task</TypographyH3>
        <TypographyP>
          Use the form below to create a new task and add it to your list.
        </TypographyP>
      </div>
      <TaskForm initialData={task} />
    </section>
  );
};

export default TaskDetail;
