import { getCategoriesManage } from '@/app/api/categories/manage/service';
import CategoryTable from '@/components/CategoryTable';

const CategoryList = async () => {
  const categories = await getCategoriesManage();

  return (
    <section className='flex flex-col gap-2 my-6 shadow-sm p-4 rounded-lg'>
      <CategoryTable initialData={categories} />
    </section>
  );
};

export default CategoryList;
