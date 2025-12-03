import FilterActions from '../FilterActions';
import { TypographyH4 } from '../ui/typography';
import TaskTableClient from './table';
import { getTasks } from '@/app/api/tasks/service';

const TaskTable = async () => {
  const taskList = await getTasks({ page: 1, limit: 10 });

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
