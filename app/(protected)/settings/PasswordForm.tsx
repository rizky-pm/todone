'use client';

import { useForm } from 'react-hook-form';
import { passwordFormSchema, TypePasswordFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TypographyH3, TypographyH4 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

const PasswordForm = () => {
  const form = useForm<TypePasswordFormSchema>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmit = (values: TypePasswordFormSchema) => {
    console.log(values);
  };

  return (
    <div className='shadow-sm rounded-lg p-6 space-y-4'>
      <TypographyH4>Password Settings</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter password...'
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Confirmation</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter password confirmation...'
                    {...field}
                    type='passwordConfirm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='text-right space-x-2'>
            <Button type='reset' variant={'outline'}>
              Reset
            </Button>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
