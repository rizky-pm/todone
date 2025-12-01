import FilterActions from '@/components/FilterActions';
import Summary from '@/components/Summary';

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-4 mt-6'>
      <FilterActions />
      <Summary />
    </section>
  );
};

export default DashboardPage;
