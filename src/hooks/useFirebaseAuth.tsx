import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { fireauth } from '../config/firebase';

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireauth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useFirebaseAuth;
