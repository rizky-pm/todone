'use client';

import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { TypographySmall } from '../ui/typography';
import UserAvatar from './UserAvatar';
import { usePathname, useRouter } from 'next/navigation';
import useIsLandingPage from '@/hooks/useIsLandingPage';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLandingPage = useIsLandingPage();

  if (pathname.includes('/sign')) {
    return;
  }

  return (
    <nav className='flex justify-between items-center py-4'>
      <div className='w-5xl flex justify-between items-center'>
        <div className='flex flex-col'>
          <span
            className='font-bold text-2xl'
            onClick={() => {
              router.push('/dashboard');
            }}
          >
            Todone
          </span>
          {isLandingPage ? null : (
            <TypographySmall>
              Organize your life, one task at time
            </TypographySmall>
          )}
        </div>

        {isLandingPage ? (
          <div className='space-x-2'>
            <Button
              variant={'outline'}
              onClick={() => {
                router.push('/sign-in');
              }}
            >
              Sign in
            </Button>
            <Button
              onClick={() => {
                router.push('/sign-up');
              }}
            >
              Get started
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            {!pathname.includes('/task') && (
              <Button
                onClick={() => {
                  router.push('/task/create-new');
                }}
              >
                <Plus />
                Add Task
              </Button>
            )}
            <UserAvatar />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
