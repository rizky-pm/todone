'use client';

import { useGetCategoriesQuery } from '@/app/services/categories';
import { useFilterStore } from '@/app/store/filter.store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Category } from '@/src/generated/client';

interface IProps {
  initialData: Category[];
}

const SelectCategory = (props: IProps) => {
  const { initialData } = props;
  const selectedCategory = useFilterStore((store) => store.category);
  const setCategory = useFilterStore((store) => store.setCategory);

  const { data: categoriesData } = useGetCategoriesQuery({ initialData });

  const data = initialData ?? categoriesData;

  return (
    <Select value={selectedCategory || ''} onValueChange={setCategory}>
      <SelectTrigger className='w-[150px]'>
        <SelectValue placeholder='All Categories' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              <span
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategory;
