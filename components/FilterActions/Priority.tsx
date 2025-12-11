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
import { PRIORITY_OPTIONS } from '@/app/constants';

const SelectPriority = () => {
  const selectedPriority = useFilterStore((store) => store.priority);
  const setPriority = useFilterStore((store) => store.setPriority);

  return (
    <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
      <TypographySmall>Priority</TypographySmall>

      <Select value={selectedPriority || ''} onValueChange={setPriority}>
        <SelectTrigger className='w-full lg:w-[150px]'>
          <SelectValue placeholder='All Priorities' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PRIORITY_OPTIONS.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPriority;
