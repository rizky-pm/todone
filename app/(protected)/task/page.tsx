import { TypographyH3, TypographyP } from '@/components/ui/typography';
import TaskForm from './TaskForm';

const Task = () => {
  return (
    <section className='flex flex-col gap-4 my-6  shadow-sm rounded-lg p-4'>
      <div className=''>
        <TypographyH3>Add New Task</TypographyH3>
        <TypographyP>
          Use the form below to create a new task and add it to your list.
        </TypographyP>
      </div>
      <TaskForm />
    </section>
  );
};

export default Task;
