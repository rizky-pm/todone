'use client';

import {
  TypographyH1,
  TypographyH3,
  TypographyP,
} from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  const router = useRouter();
  return (
    <section className='flex flex-col lg:flex-row w-screen h-screen'>
      <div className='lg:w-[40%] order-2 h-[20%] lg:h-screen bg-primary text-background flex flex-col justify-center px-10 md:px-40 lg:px-10 xl:px-20 2xl:px-40 3xl:px-80 4xl:px-[400px]'>
        <TypographyH1 className='text-left mt-2 3xl:text-5xl 4xl:text-6xl'>
          Get Started
        </TypographyH1>
        <TypographyP className='mt-2 3xl:text-lg 4xl:text-xl'>
          Create an account to manage your tasks and stay in control of your
          productivity.
        </TypographyP>
      </div>
      <div className='lg:w-[60%] order-1 h-[80%] lg:h-screen flex flex-col gap-2 justify-center px-10 md:px-40 xl:px-50 2xl:px-80 3xl:px-[500px] 4xl:px-[700px]'>
        <div
          className='cursor-pointer'
          onClick={() => {
            router.push('/');
          }}
        >
          <TypographyH1 className='text-left'>todone</TypographyH1>
        </div>

        <TypographyH3>Create Account</TypographyH3>
        <TypographyP className='mt-1'>
          Please fill in the information below to get started
        </TypographyP>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPage;
