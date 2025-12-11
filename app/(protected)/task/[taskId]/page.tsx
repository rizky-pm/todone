import { TypographyH3, TypographyP } from '@/components/ui/typography';
import { getTaskById } from '@/app/api/tasks/[taskId]/service';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const TaskActions = dynamic(() => import('./TaskActions'));
const TaskForm = dynamic(() => import('../TaskForm'));

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
    <section className='flex flex-col gap-4 my-6 shadow-sm rounded-lg p-4'>
      <div className='flex justify-between'>
        <div className='w-full'>
          <div className='flex justify-between w-full'>
            <TypographyH3>Task Overview</TypographyH3>

            <TaskActions taskId={taskId} />
          </div>
          <TypographyP className='mt-4 md:mt-0'>
            Review the information below to see full details related to this
            task.
          </TypographyP>
        </div>
      </div>
      <TaskForm initialData={task} />
    </section>
  );
};

export default TaskDetail;
