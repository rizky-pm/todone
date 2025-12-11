import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const ProfileForm = dynamic(() => import('./ProfileForm'));
const PasswordForm = dynamic(() => import('./PasswordForm'));
const DangerZone = dynamic(() => import('./DangerZone'));

const Settings = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <section className='flex flex-col my-6 justify-center items-center'>
      <div className='w-xs md:w-xl lg:w-xl 2xl:w-3xl space-y-4 '>
        <ProfileForm initialData={user} />
        <PasswordForm />
        <DangerZone />
      </div>
    </section>
  );
};

export default Settings;
