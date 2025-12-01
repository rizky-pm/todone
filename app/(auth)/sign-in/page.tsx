'use client';

import { TypographyH1, TypographyP } from '@/components/ui/typography';
import SignInForm from './SignInForm';

const SigInPage = () => {
  return (
    <section className='w-full flex flex-col justify-center items-center h-full'>
      <div className='border border-foreground shadow-lg rounded-lg w-4/6 overflow-hidden flex h-[500px]'>
        <div className='w-1/2 p-8 flex flex-col justify-center bg-foreground text-background'>
          <span className='font-extrabold text-xl'>todone</span>
          <TypographyH1 className='text-left mt-2'>Welcome Back</TypographyH1>
          <TypographyP className='mt-2'>
            Sign in to continue tracking your work and keeping your productivity
            on schedule.
          </TypographyP>
        </div>
        <div className='w-1/2 p-8 flex flex-col justify-center'>
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default SigInPage;
