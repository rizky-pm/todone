import { getCategoriesManage } from '@/app/api/categories/manage/service';
import { getCurrentUser } from '@/app/lib/auth';
import CategoryTable from '@/components/CategoryTable';
import { redirect } from 'next/navigation';

const CategoryList = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const categories = await getCategoriesManage(user.id);

  return (
    <section className='flex flex-col gap-2 my-6 shadow-sm p-4 rounded-lg'>
      <CategoryTable initialData={categories} />
    </section>
  );
};

export default CategoryList;
