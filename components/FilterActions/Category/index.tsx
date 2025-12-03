import { TypographySmall } from '@/components/ui/typography';
import SelectCategory from './SelectCategory';
import { getCategories } from '@/app/api/categories/service';

const Category = async () => {
  const categories = await getCategories();

  return (
    <div className='flex items-center gap-2'>
      <TypographySmall>Category</TypographySmall>

      <SelectCategory initialData={categories} />
    </div>
  );
};

export default Category;
