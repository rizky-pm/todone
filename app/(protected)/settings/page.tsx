import { TypographyH3, TypographyP } from '@/components/ui/typography';
import ProfileForm from './ProfileForm';
import { getCurrentUser } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import PasswordForm from './PasswordForm';

const Settings = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <section className='flex flex-col gap-4 my-6'>
      <div>
        <TypographyH3>Account Settings</TypographyH3>
        <TypographyP>
          Update your profile details, change your password, and manage your
          account settings, including deleting your account.
        </TypographyP>
      </div>

      <ProfileForm initialData={user} />
      <PasswordForm />
    </section>
  );
};

export default Settings;
