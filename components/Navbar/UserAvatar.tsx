'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, Tags } from 'lucide-react';
import { useMemo } from 'react';
import { getInitials } from '@/app/lib/string';
import { useSignOutMutation } from '@/app/services/auth';
import { redirect, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/auth.store';

const UserAvatar = () => {
  const router = useRouter();
  const user = useAuthStore((store) => store.user);

  const { mutateAsync, isPending } = useSignOutMutation();

  const fullNameFallback = useMemo(() => {
    if (!user) return null;

    const fallback = getInitials(user.fullName);

    return fallback;
  }, [user]);

  const onClickManageCategory = () => {
    router.push('/category');
  };

  const onClickSettings = () => {
    router.push('/settings');
  };

  const signOut = () => {
    mutateAsync(undefined, {
      onSuccess: () => {
        redirect('/sign-in');
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className='h-10 w-10 rounded-full'>
          <AvatarImage src={user?.image ?? ''} />
          <AvatarFallback className='rounded-full'>
            {fullNameFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={onClickManageCategory}>
          <Tags /> Manage Category
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickSettings}>
          <Settings /> Settings
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={signOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
