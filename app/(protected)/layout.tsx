import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import { getCurrentUser } from '../lib/auth';
import AuthHydrator from '@/components/AuthHydrator';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Todone',
  description: 'Organize your life, one task at time',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      <AuthHydrator user={user} />
      <section className='flex items-center justify-center'>
        <div className='w-5xl'>{children}</div>
      </section>
    </>
  );
}
