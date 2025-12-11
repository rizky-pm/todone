import { TypographySmall } from '@/components/ui/typography';
import SelectCategory from './SelectCategory';
import { getCategories } from '@/app/api/categories/service';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

const Category = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const categories = await getCategories(user.id);

  return (
    <div className='flex flex-col lg:flex-row lg:items-center gap-2'>
      <TypographySmall>Category</TypographySmall>

      <SelectCategory initialData={categories} />
    </div>
  );
};

export default Category;
