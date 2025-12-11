import SelectStatus from './Status';
import SelectPriority from './Priority';
import Category from './Category';
import Buttons from './Buttons';

const FilterActions = () => {
  return (
    <div className='flex flex-col lg:flex-row gap-4 mt-4 lg:mt-0 lg:items-center'>
      <Category />
      <SelectStatus />
      <SelectPriority />

      <Buttons />
    </div>
  );
};

export default FilterActions;
