import SelectStatus from './Status';
import SelectPriority from './Priority';
import Category from './Category';
import Buttons from './Buttons';

const FilterActions = () => {
  return (
    <div className='flex gap-4 items-center'>
      <Category />
      <SelectStatus />
      <SelectPriority />

      <Buttons />
    </div>
  );
};

export default FilterActions;
