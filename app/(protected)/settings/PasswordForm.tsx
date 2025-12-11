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
import { TypographyH4 } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Eye, EyeClosed } from 'lucide-react';
import { useChangePasswordMutation } from '@/app/services/user';
import { toast } from 'sonner';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';

const PasswordForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [
    isNewPasswordConfirmationVisible,
    setIsNewPasswordConfirmationVisible,
  ] = useState(false);

  const form = useForm<TypePasswordFormSchema>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  });

  const { mutateAsync: changePassword, isPending: changingPassword } =
    useChangePasswordMutation();

  const onReset = () => {
    form.reset();
  };

  const onSubmit = (values: TypePasswordFormSchema) => {
    const payload = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    changePassword(payload, {
      onSuccess: (response) => {
        toast.success(response.message, {
          duration: 4000,
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
    <div className='shadow-sm rounded-lg p-6 space-y-4'>
      <TypographyH4>Password Settings</TypographyH4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='oldPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder='Enter current password...'
                      type={isPasswordVisible ? 'text' : 'password'}
                      autoComplete='off'
                      {...field}
                    />

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

          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder='Enter new password...'
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      autoComplete='off'
                      {...field}
                    />

                    <InputGroupAddon
                      align='inline-end'
                      className='cursor-pointer'
                      onClick={() => {
                        setIsNewPasswordVisible((prevState) => !prevState);
                      }}
                    >
                      {!isNewPasswordVisible ? <Eye /> : <EyeClosed />}
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='newPasswordConfirm'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password Confirmation</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      placeholder='Enter new password confirmation...'
                      type={
                        isNewPasswordConfirmationVisible ? 'text' : 'password'
                      }
                      autoComplete='off'
                      {...field}
                    />

                    <InputGroupAddon
                      align='inline-end'
                      className='cursor-pointer'
                      onClick={() => {
                        setIsNewPasswordConfirmationVisible(
                          (prevState) => !prevState
                        );
                      }}
                    >
                      {!isNewPasswordConfirmationVisible ? (
                        <Eye />
                      ) : (
                        <EyeClosed />
                      )}
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-2 md:block md:text-right md:space-x-2'>
            <Button
              type='reset'
              variant={'outline'}
              disabled={changingPassword}
              onClick={onReset}
              className='order-2 md:order-1'
            >
              Reset
            </Button>
            <Button
              type='submit'
              disabled={changingPassword}
              className='order-1 md:order-2'
            >
              {changingPassword ? (
                <>
                  <Spinner />
                  Changing Password
                </>
              ) : (
                'Change Password'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PasswordForm;
