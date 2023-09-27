import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Nav } from './navbar.styled';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

import useUiStore from '../../state/ui/uiStore';
import { fireauth } from '../../config/firebase';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  const {
    isSignInModalOpen,
    setIsSignInModalOpen,
    isSignUpModalOpen,
    setIsSignUpModalOpen,
  } = useUiStore();

  const handleSignOut = () => {
    signOut(fireauth)
      .then(() => {
        localStorage.removeItem('user');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    onAuthStateChanged(fireauth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Nav>
      <ul>
        <li className='logo'>todone</li>
        {!user ? (
          <>
            <li>
              <Button
                onClick={() => {
                  setIsSignInModalOpen(!isSignInModalOpen);
                }}
                variant='text'
              >
                Sign In
              </Button>
            </li>
            <li>
              <Button
                onClick={() => {
                  setIsSignUpModalOpen(!isSignUpModalOpen);
                }}
                variant='contained'
              >
                Sign Up
              </Button>
            </li>
          </>
        ) : (
          <>
            <Button onClick={handleSignOut} variant='contained'>
              Sign Out
            </Button>
          </>
        )}
      </ul>
    </Nav>
  );
};

export default Navbar;
