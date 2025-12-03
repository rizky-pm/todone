'use client';

import { Button } from '../ui/button';
import { useFilterStore } from '@/app/store/filter.store';

const Buttons = () => {
  const clearFilter = useFilterStore((store) => store.clearFilter);
  const applyFilter = useFilterStore((store) => store.applyFilter);

  return (
    <div className='space-x-2'>
      <Button onClick={applyFilter}>Apply</Button>
      <Button variant={'outline'} onClick={clearFilter}>
        Clear
      </Button>
    </div>
  );
};

export default Buttons;
