import React, { useState } from 'react';
import {
  Button,
  Divider,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Nav } from './navbar.styled';
import { signOut } from 'firebase/auth';

import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import useUiStore from '../../state/ui/uiStore';
import { fireauth } from '../../config/firebase';
import UserIcon from '../../assets/UserIcon';

const Navbar = () => {
  const user = useFirebaseAuth();

  const isSmallDevice = useMediaQuery('(max-width:600px)');

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            {isSmallDevice ? (
              <>
                <UserIcon
                  w='32px'
                  h='32px'
                  marginLeft='auto'
                  onClickHandler={handleClick}
                />

                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  sx={{
                    maxWidth: '75%',
                  }}
                >
                  <MenuItem>
                    <Typography
                      variant='inherit'
                      color={'#3993DD'}
                      fontWeight={600}
                      noWrap
                    >
                      {user.email}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Button
                      onClick={handleSignOut}
                      variant='contained'
                      fullWidth
                      color='error'
                    >
                      Sign Out
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <p>{user.email}</p>
                <Button
                  onClick={handleSignOut}
                  variant='contained'
                  color='error'
                >
                  Sign Out
                </Button>
              </>
            )}
          </>
        )}
      </ul>
    </Nav>
  );
};

export default Navbar;
