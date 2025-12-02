import FilterActions from '@/components/FilterActions';
import Summary from '@/components/Summary';
import TaskTable from '@/components/TaskTable';

const DashboardPage = () => {
  return (
    <section className='flex flex-col gap-8 mt-6'>
      <FilterActions />
      <Summary />
      <TaskTable />
    </section>
  );
};

export default DashboardPage;
