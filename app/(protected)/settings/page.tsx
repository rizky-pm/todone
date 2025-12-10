import ProfileForm from './ProfileForm';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import PasswordForm from './PasswordForm';
import DangerZone from './DangerZone';

const Settings = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <section className='flex flex-col justify-center items-center gap-4 my-6'>
      <div className='w-3xl space-y-4 '>
        <ProfileForm initialData={user} />
        <PasswordForm />
        <DangerZone />
      </div>
    </section>
  );
};

export default Settings;
