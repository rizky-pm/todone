import { TypographyH1, TypographyP } from '@/components/ui/typography';
import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  return (
    <section className='w-full flex flex-col justify-center items-center h-full'>
      <div className='border border-foreground shadow-lg rounded-lg w-5/6 overflow-hidden flex h-[500px]'>
        <div className='w-1/2 p-8 flex flex-col justify-center bg-foreground text-background'>
          <span className='font-extrabold text-xl'>todone</span>
          <TypographyH1 className='text-left mt-2'>Get Started</TypographyH1>
          <TypographyP className='mt-2'>
            Create an account to manage your tasks and stay in control of your
            productivity.
          </TypographyP>
        </div>
        <div className='w-1/2 p-8 flex flex-col justify-center'>
          <SignUpForm />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
