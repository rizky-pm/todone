'use client';

import { usePathname, useRouter } from 'next/navigation';
import { TypographySmall } from '../ui/typography';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const LandingPageNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className='flex justify-between items-center py-4'>
      <div className='flex flex-col'>
        <span
          className='font-bold text-2xl'
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          Todone
        </span>
        <TypographySmall>Organize your life, one task at time</TypographySmall>
      </div>

      <div className='flex items-center gap-4'>
        {!pathname.includes('/sign') && (
          <Button
            onClick={() => {
              router.push('/task/create-new');
            }}
          >
            <Plus />
            Add Task
          </Button>
        )}
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
