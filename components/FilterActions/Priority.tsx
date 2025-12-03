'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TypographySmall } from '../ui/typography';
import { useFilterStore } from '@/app/store/filter.store';

const SelectPriority = () => {
  const selectedPriority = useFilterStore((store) => store.priority);
  const setPriority = useFilterStore((store) => store.setPriority);

  return (
    <div className='flex items-center gap-2'>
      <TypographySmall>Priority</TypographySmall>

      <Select value={selectedPriority || ''} onValueChange={setPriority}>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='All Priorities' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='low'>Low</SelectItem>
            <SelectItem value='medium'>Medium</SelectItem>
            <SelectItem value='high'>High</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPriority;
