import { getCurrentUser } from '@/app/lib/auth';
import FilterActions from '../FilterActions';
import { TypographyH4 } from '../ui/typography';
import TaskTableClient from './table';
import { getTasks } from '@/app/api/tasks/service';
import { redirect } from 'next/navigation';

const TaskTable = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const taskList = await getTasks({ page: 1, limit: 10 }, user.id);

  return (
    <div className='shadow-sm p-4 rounded-lg'>
      <div className='flex justify-between items-center'>
        <TypographyH4>Tasks</TypographyH4>

        <FilterActions />
      </div>

      <TaskTableClient data={taskList.tasks} meta={taskList.meta} />
    </div>
  );
};

export default TaskTable;
