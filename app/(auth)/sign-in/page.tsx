'use client';

import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from '@/components/ui/typography';
import SignInForm from './SignInForm';
import { useRouter } from 'next/navigation';

const SigInPage = () => {
  const router = useRouter();

  return (
    <section className='flex flex-col lg:flex-row w-screen h-screen'>
      <div className='lg:w-[40%] order-2 lg:order-1 h-[20%] lg:h-screen bg-primary text-background flex flex-col justify-center px-10 md:px-40 lg:px-10 xl:px-20 2xl:px-40 3xl:px-80 4xl:px-[400px]'>
        <TypographyH1 className='text-left mt-2 3xl:text-5xl 4xl:text-6xl'>
          Welcome Back
        </TypographyH1>
        <TypographyP className='mt-2 3xl:text-lg 4xl:text-xl'>
          Sign in to continue tracking your work and keeping your productivity
          on schedule.
        </TypographyP>
      </div>
      <div className='lg:w-[60%] order-1 lg:order-2 h-[80%] lg:h-screen flex flex-col gap-2 justify-center px-10 md:px-40 xl:px-50 2xl:px-80 3xl:px-[500px] 4xl:px-[700px]'>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('/');
          }}
        >
          <TypographyH1 className='text-left'>todone</TypographyH1>
        </div>
        <TypographyH3>Sign in to your account</TypographyH3>
        <TypographyP className='mt-1'>
          Enter your credentials to access your tasks.
        </TypographyP>
        <SignInForm />
      </div>
    </section>
  );
};

export default SigInPage;
