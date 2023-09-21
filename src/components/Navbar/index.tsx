import { Button } from '@mui/material';
import { Nav } from './navbar.styled';

import useUiStore from '../../state/ui/uiStore';

const Navbar = () => {
  const { isModalOpen, setIsModalOpen } = useUiStore();

  return (
    <Nav>
      <ul>
        <li>todone</li>
        <li>
          <Button
            onClick={() => {
              setIsModalOpen(!isModalOpen);
            }}
            variant='text'
          >
            Sign In
          </Button>
        </li>
      </ul>
    </Nav>
  );
};

export default Navbar;
