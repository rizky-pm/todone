'use client';

import { usePathname } from 'next/navigation';

const useIsLandingPage = () => {
  const pathname = usePathname();

  return pathname === '/';
};

export default useIsLandingPage;
