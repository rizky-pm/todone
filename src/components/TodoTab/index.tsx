import React from 'react';
import { Box } from '@mui/material';

import styled from '@emotion/styled';

const CustomBox = styled(Box)`
  padding: 1rem 1.25rem;

  @media ${(props) => props.theme.mediaQueries.xs} {
    padding: 1rem 0.25rem;
  }
`;
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
        <CustomBox textAlign={'center'}>{children}</CustomBox>
      )}
    </div>
  );
};

export default TodoTab;
