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

import { Eye, EyeClosed, Lock, Mail } from 'lucide-react';
import { TypographyP } from '@/components/ui/typography';
import { signUpSchema, TypeSignUpSchema } from './schema';
import { useState } from 'react';
import { useSignUpMutation } from '@/app/services/auth';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import axios from 'axios';

const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const { mutateAsync, isPending } = useSignUpMutation();

  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSignIn = async (values: TypeSignUpSchema) => {
    mutateAsync(values, {
      onSuccess: () => {
        toast.success('Sign up success, redirecting to sign in page', {
          duration: 4000,
          onAutoClose: () => {
            router.push('/sign-in');
          },
        });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data.error;
          toast.error(errorMessage);
          console.error('Error: ', error);
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className='space-y-4 mt-8'>
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    placeholder='Enter your full name'
                    {...field}
                  />
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
              <Spinner /> Signing up
            </>
          ) : (
            'Sign up'
          )}
        </Button>
      </form>
      <TypographyP className='text-sm text-center mt-1'>
        Already have an account?{' '}
        <Button
          variant={'link'}
          className='text-left p-0'
          onClick={() => {
            router.push('/sign-in');
          }}
        >
          Sign in here
        </Button>
      </TypographyP>
    </Form>
  );
};

export default SignUpForm;
