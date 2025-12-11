'use client';

import { useAuthStore } from '@/app/store/auth.store';
import { User } from '@prisma/client';
import { useEffect } from 'react';

interface IProps {
  user: Pick<User, 'id' | 'email' | 'fullName' | 'image'> | null;
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
