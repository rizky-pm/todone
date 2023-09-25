import { useState } from 'react';
import styled from '@emotion/styled';
import { IconProps } from '../../common';

interface TrashIconStyledProps extends IconProps {
  marginLeft: string;
}

interface TrashIconProps extends IconProps {
  marginLeft: string;
  onClickHandler: (todoId: string) => void;
  todoId: string;
}

const StyledIcon = styled.span<TrashIconStyledProps>`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  margin-left: ${(props) => props.marginLeft};
  cursor: pointer;
  transition: all 0.1s ease;
`;

const TrashIcon = (props: TrashIconProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const { w, h, onClickHandler, marginLeft, todoId } = props;

  return (
    <StyledIcon
      w={w}
      h={h}
      marginLeft={marginLeft}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        onClickHandler(todoId);
      }}
    >
      <svg
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        stroke={isHovered ? '#28679b' : '#0d1821'}
        style={{
          transition: 'all .1s ease',
        }}
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path
            d='M10 12V17'
            stroke={isHovered ? '#28679b' : '#0d1821'}
            style={{
              transition: 'all .1s ease',
            }}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M14 12V17'
            stroke={isHovered ? '#28679b' : '#0d1821'}
            style={{
              transition: 'all .1s ease',
            }}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M4 7H20'
            stroke={isHovered ? '#28679b' : '#0d1821'}
            style={{
              transition: 'all .1s ease',
            }}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10'
            stroke={isHovered ? '#28679b' : '#0d1821'}
            style={{
              transition: 'all .1s ease',
            }}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
          <path
            d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
            stroke={isHovered ? '#28679b' : '#0d1821'}
            style={{
              transition: 'all .1s ease',
            }}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></path>{' '}
        </g>
      </svg>
    </StyledIcon>
  );
};

export default TrashIcon;
