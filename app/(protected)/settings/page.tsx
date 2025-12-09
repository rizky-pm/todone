import { TypographyH3, TypographyP } from '@/components/ui/typography';
import ProfileForm from './ProfileForm';

const Settings = () => {
  return (
    <section className='flex flex-col gap-2 my-6 shadow-sm p-4 rounded-lg'>
      <div>
        <TypographyH3>Account Settings</TypographyH3>
        <TypographyP>
          Update your profile details, change your password, and manage your
          account settings, including deleting your account.
        </TypographyP>
      </div>

      <ProfileForm />
    </section>
  );
};

export default Settings;
