'use client';
import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  sm: '(min-width: 40rem)', // > 640px
  md: '(min-width: 48rem)', // > 768px
  lg: '(min-width: 64rem)', // > 1024px
  xl: '(min-width: 80rem)', // > 1280px
  '2xl': '(min-width: 96rem)', // > 1536px
};

export const useBreakpoints = () => {
  const isSmallScren = useMediaQuery({ query: breakpoints.sm });
  const isMediumScreen = useMediaQuery({ query: breakpoints.md });
  const isLargeScreen = useMediaQuery({ query: breakpoints.lg });
  const isExtraLargeScreen = useMediaQuery({ query: breakpoints.xl });
  const isTwoExtraLargeScreen = useMediaQuery({ query: breakpoints['2xl'] });

  return {
    isSmallScren,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
    isTwoExtraLargeScreen,
  };
};
