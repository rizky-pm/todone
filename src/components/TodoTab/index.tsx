import React from 'react';
import { Box } from '@mui/material';

interface ComponentProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TodoTab = (props: ComponentProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`todos-filter-${index}`}
      aria-labelledby={`todos-filter-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} textAlign={'center'}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TodoTab;
