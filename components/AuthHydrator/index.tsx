'use client';

import { useAuthStore } from '@/app/store/auth.store';
import { IUser } from '@/app/types';
import { useEffect } from 'react';

interface IProps {
  user: IUser | null;
}

const AuthHydrator = (props: IProps) => {
  const { user } = props;

  const setUser = useAuthStore((store) => store.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  return null;
};

export default AuthHydrator;
