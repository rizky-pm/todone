import { Check, CircleAlert, Clock3, ListTodo } from 'lucide-react';
import { TypographyMuted } from '../ui/typography';
import { ISummary } from '@/app/types';

interface IInitialData {
  data: ISummary;
}

const Summary = (props: IInitialData) => {
  const { data } = props;
  const { completed, incomplete, overdue, total } = data;

  return (
    <div className='flex gap-4'>
      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Total tasks</TypographyMuted>
          <span className='font-bold text-2xl'>{total}</span>
        </div>

        <div className='bg-blue-200 p-2 rounded-lg w-10 h-10 flex justify-center items-center'>
          <ListTodo className='text-blue-600 w-5 h-5' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Completed</TypographyMuted>
          <span className='font-bold text-2xl'>{completed}</span>
        </div>

        <div className='bg-green-200 p-2 rounded-lg w-10 h-10 flex justify-center items-center'>
          <Check className='text-green-600 w-5 h-5' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>In Progress</TypographyMuted>
          <span className='font-bold text-2xl'>{incomplete}</span>
        </div>

        <div className='bg-yellow-200 p-2 rounded-lg w-10 h-10 flex justify-center items-center'>
          <Clock3 className='text-yellow-600 w-5 h-5' />
        </div>
      </div>

      <div className='shadow-sm rounded-lg w-1/4 p-4  flex justify-between items-center'>
        <div className='flex flex-col'>
          <TypographyMuted>Overdue</TypographyMuted>
          <span className='font-bold text-2xl'>{overdue}</span>
        </div>

        <div className='bg-red-200 p-2 rounded-lg w-10 h-10 flex justify-center items-center'>
          <CircleAlert className='text-red-600 w-5 h-5' />
        </div>
      </div>
    </div>
  );
};

export default Summary;
