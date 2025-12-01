import React from 'react';
import SelectCategory from './Category';
import SelectStatus from './Status';
import SelectPriority from './Priority';

const FilterActions = () => {
  return (
    <div className='flex gap-4'>
      <SelectCategory />
      <SelectStatus />
      <SelectPriority />
    </div>
  );
};

export default FilterActions;
