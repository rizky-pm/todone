import { getSummary } from '@/app/api/tasks/summary/service';
import Summary from '@/components/Summary';
import TaskTable from '@/components/TaskTable';

const DashboardPage = async () => {
  const summary = await getSummary();

  return (
    <section className='flex flex-col gap-8 my-6'>
      <Summary data={summary} />
      <TaskTable />
    </section>
  );
};

export default DashboardPage;
