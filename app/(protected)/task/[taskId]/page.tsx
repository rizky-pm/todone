import { TypographyH3, TypographyP } from '@/components/ui/typography';
import TaskForm from '../TaskForm';
import { getTaskById } from '@/app/api/tasks/[taskId]/service';
import TaskActions from './TaskActions';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

const TaskDetail = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const taskId = (await params).taskId;
  const task = await getTaskById(taskId, user.id);

  return (
    <section className='flex flex-col gap-4 my-6  shadow-sm rounded-lg p-4'>
      <div className='flex justify-between'>
        <div>
          <TypographyH3>Task Overview</TypographyH3>
          <TypographyP>
            Review the information below to see full details related to this
            task.
          </TypographyP>
        </div>
        <TaskActions taskId={taskId} />
      </div>
      <TaskForm initialData={task} />
    </section>
  );
};

export default TaskDetail;
