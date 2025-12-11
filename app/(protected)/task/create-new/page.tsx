import { TypographyH3, TypographyP } from '@/components/ui/typography';
import dynamic from 'next/dynamic';

const TaskForm = dynamic(() => import('../TaskForm'));

const Task = () => {
  return (
    <section className='flex flex-col gap-4 my-6 shadow-sm rounded-lg p-4'>
      <div className=''>
        <TypographyH3>Add New Task</TypographyH3>
        <TypographyP>
          Use the form below to create a new task and add it to your list.
        </TypographyP>
      </div>
      <TaskForm initialData={null} />
    </section>
  );
};

export default Task;
