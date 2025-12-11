'use client';

import { Menu, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { TypographySmall } from '../ui/typography';
import UserAvatar from './UserAvatar';
import { usePathname, useRouter } from 'next/navigation';
import useIsLandingPage from '@/hooks/useIsLandingPage';
import { useBreakpoints } from '@/hooks/useBreakpoints';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const AuthButtons = () => {
  const router = useRouter();

  return (
    <div className='space-x-2'>
      <Button variant='outline' onClick={() => router.push('/sign-in')}>
        Sign in
      </Button>
      <Button onClick={() => router.push('/sign-up')}>Get started</Button>
    </div>
  );
};

const NavbarTitle = () => {
  const router = useRouter();
  return (
    <span
      className='font-bold text-2xl cursor-pointer'
      onClick={() => router.push('/dashboard')}
    >
      Todone
    </span>
  );
};

const NavbarDescription = () => (
  <TypographySmall>Organize your life, one task at a time</TypographySmall>
);

const MobileMenu = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon'>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className='px-2'>
        <SheetHeader>
          <SheetTitle>Todone</SheetTitle>
          <SheetDescription>
            Organize your life, one task at a time.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col gap-4'>
          <Button variant='outline' onClick={() => router.push('/sign-in')}>
            Sign in
          </Button>
          <Button onClick={() => router.push('/sign-up')}>Get started</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isLandingPage = useIsLandingPage();
  const { isMediumScreen } = useBreakpoints();

  if (pathname.includes('/sign')) return null;

  return (
    <nav className='flex justify-between items-center py-4'>
      <div className='w-xs md:w-xl lg:w-5xl flex justify-between items-center'>
        <div className='flex flex-col'>
          <NavbarTitle />
          {!isLandingPage && isMediumScreen && <NavbarDescription />}
        </div>

        {isLandingPage ? (
          isMediumScreen ? (
            <AuthButtons />
          ) : (
            <MobileMenu />
          )
        ) : (
          <div className='flex items-center gap-4'>
            {!pathname.includes('/task') && (
              <Button
                onClick={() => router.push('/task/create-new')}
                size={isMediumScreen ? 'default' : 'icon-sm'}
              >
                <Plus /> {isMediumScreen ? 'Add Task' : ''}
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
