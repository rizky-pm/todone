import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { fireauth } from '../config/firebase';

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(fireauth, (authUser) => {
      setIsLoading(false);
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading };
};

export default useFirebaseAuth;
