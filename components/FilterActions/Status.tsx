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

const SelectStatus = () => {
  const selectedStatus = useFilterStore((store) => store.status);
  const setStatus = useFilterStore((store) => store.setStatus);

  return (
    <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
      <TypographySmall>Status</TypographySmall>

      <Select value={selectedStatus || ''} onValueChange={setStatus}>
        <SelectTrigger className='w-full lg:w-[150px]'>
          <SelectValue placeholder='All Status' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='incomplete'>In Progess</SelectItem>
            <SelectItem value='complete'>Completed</SelectItem>
            <SelectItem value='overdue'>Overdue</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectStatus;
