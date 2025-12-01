import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { TypographySmall } from '../ui/typography';
import UserAvatar from './UserAvatar';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center py-4'>
      <div className='flex flex-col'>
        <span className='font-bold text-2xl'>Todone</span>
        <TypographySmall>Organize your life, one task at time</TypographySmall>
      </div>

      <div className='flex items-center gap-4'>
        <Button>
          <Plus />
          Add Task
        </Button>
        <UserAvatar />
      </div>
    </nav>
  );
};

export default Navbar;
