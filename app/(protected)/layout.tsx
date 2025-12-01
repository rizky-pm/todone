import type { Metadata } from 'next';

import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Todone',
  description: 'Organize your life, one task at time',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex items-center justify-center'>
      <div className='max-w-5xl'>
        <Navbar />
        {children}
      </div>
    </section>
  );
}
