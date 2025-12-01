import { Check, CircleAlert, Clock3, ListTodo } from 'lucide-react';
import { TypographyMuted } from '../ui/typography';

const Summary = () => {
  return (
    <div className='flex gap-4'>
      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Total tasks</TypographyMuted>
          <span className='font-bold text-2xl'>24</span>
        </div>

        <div className='bg-blue-200 p-2 rounded-lg'>
          <ListTodo className='text-blue-600' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Completed</TypographyMuted>
          <span className='font-bold text-2xl'>12</span>
        </div>

        <div className='bg-green-200 p-2 rounded-lg'>
          <Check className='text-green-600' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Total tasks</TypographyMuted>
          <span className='font-bold text-2xl'>24</span>
        </div>

        <div className='bg-yellow-200 p-2 rounded-lg'>
          <Clock3 className='text-yellow-600' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Overdue</TypographyMuted>
          <span className='font-bold text-2xl'>24</span>
        </div>

        <div className='bg-red-200 p-2 rounded-lg'>
          <CircleAlert className='text-red-600' />
        </div>
      </div>
    </div>
  );
};

export default Summary;
