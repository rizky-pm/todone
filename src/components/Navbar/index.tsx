import { Button } from '@mui/material';
import { Nav } from './navbar.styled';
import { signOut } from 'firebase/auth';

import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import useUiStore from '../../state/ui/uiStore';
import { fireauth } from '../../config/firebase';

const Navbar = () => {
  const user = useFirebaseAuth();

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
