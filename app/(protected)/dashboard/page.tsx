import { getSummary } from '@/app/api/tasks/summary/service';
import { getCurrentUser } from '@/app/lib/auth';
import Summary from '@/components/Summary';
import TaskTable from '@/components/TaskTable';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const summary = await getSummary(user.id);

  return (
    <section className='flex flex-col gap-8 my-6'>
      <Summary data={summary} />
      <TaskTable />
    </section>
  );
};

export default DashboardPage;
