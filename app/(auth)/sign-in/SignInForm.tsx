'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import { signInSchema, TypeSignInSchema } from './schema';
import { Eye, EyeClosed, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { TypographyH2, TypographyP } from '@/components/ui/typography';
import { useSignInMutation } from '@/app/services/auth';
import { toast } from 'sonner';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const { mutateAsync, isPending } = useSignInMutation();

  const form = useForm<TypeSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignIn = async (values: TypeSignInSchema) => {
    mutateAsync(values, {
      onSuccess: () => {
        toast.success('Sign in success, redirecting to dashboard page', {
          duration: 4000,
          onAutoClose: () => {
            router.push('/dashboard');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
          console.error('Error: ', error);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <TypographyH2>Sign in to your account</TypographyH2>
      <TypographyP className='mt-1'>
        Enter your credentials to access your tasks.
      </TypographyP>
      <form onSubmit={form.handleSubmit(onSignIn)} className='space-y-4 mt-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput placeholder='Enter your email' {...field} />
                  <InputGroupAddon>
                    <Mail />
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    placeholder='Enter your password'
                    type={isPasswordVisible ? 'text' : 'password'}
                    autoComplete='off'
                    {...field}
                  />
                  <InputGroupAddon>
                    <Lock />
                  </InputGroupAddon>

                  <InputGroupAddon
                    align='inline-end'
                    className='cursor-pointer'
                    onClick={() => {
                      setIsPasswordVisible((prevState) => !prevState);
                    }}
                  >
                    {!isPasswordVisible ? <Eye /> : <EyeClosed />}
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full' disabled={isPending}>
          {isPending ? (
            <>
              <Spinner /> Signing in
            </>
          ) : (
            'Sign in'
          )}
        </Button>
      </form>
      <TypographyP className='text-sm text-center mt-1'>
        Don&apos;t have an account?{' '}
        <Button
          variant={'link'}
          className='text-left p-0'
          onClick={() => {
            router.push('/sign-up');
          }}
        >
          Sign up here
        </Button>
      </TypographyP>
    </Form>
  );
};

export default SignInForm;
