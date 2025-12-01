import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { TypographySmall } from '../ui/typography';

const SelectCategory = () => {
  return (
    <div className='flex items-center gap-2'>
      <TypographySmall>Category</TypographySmall>

      <Select>
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='All Categories' />
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

export default SelectCategory;
