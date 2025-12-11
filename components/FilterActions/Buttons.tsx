'use client';

import { Button } from '../ui/button';
import { useFilterStore } from '@/app/store/filter.store';

const Buttons = () => {
  const clearFilter = useFilterStore((store) => store.clearFilter);
  const applyFilter = useFilterStore((store) => store.applyFilter);

  return (
    <div className='space-y-2 lg:space-y-0 lg:space-x-2'>
      <Button onClick={applyFilter} className='w-full lg:w-auto'>
        Apply
      </Button>
      <Button
        variant={'outline'}
        onClick={clearFilter}
        className='w-full lg:w-auto'
      >
        Clear
      </Button>
    </div>
  );
};

export default Buttons;
