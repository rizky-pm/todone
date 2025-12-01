import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TypographySmall } from '../ui/typography';

const SelectPriority = () => {
  return (
    <div className='flex items-center gap-2'>
      <TypographySmall>Priority</TypographySmall>

      <Select>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='All Priorities' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectPriority;
