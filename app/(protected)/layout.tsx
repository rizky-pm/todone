import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';
import { getCurrentUser } from '../lib/auth';
import AuthHydrator from '@/components/AuthHydrator';

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

  return (
    <>
      <AuthHydrator user={user} />
      <section className='flex items-center justify-center'>
        <div className='w-5xl'>
          <Navbar />
          {children}
        </div>
      </section>
    </>
  );
}
