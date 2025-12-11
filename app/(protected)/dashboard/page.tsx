import { getSummary } from '@/app/api/tasks/summary/service';
import { getCurrentUser } from '@/app/lib/auth';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const Summary = dynamic(() => import('@/components/Summary'));
const TaskTable = dynamic(() => import('@/components/TaskTable'));

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
