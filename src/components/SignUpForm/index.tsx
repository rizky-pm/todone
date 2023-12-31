import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography, Alert } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import styled from '@emotion/styled';

import useUiStore from '../../state/ui/uiStore';
import { fireauth, firestore } from '../../config/firebase';
import SignUpIllustration from '../../assets/illustrations/undraw_signup.svg';
import { TodoType } from '../../../common';
import { doc, setDoc } from 'firebase/firestore';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const Illustration = styled.img`
  width: 15.625rem;
  height: 9.375rem;
`;

Illustration.defaultProps = {
  src: SignUpIllustration,
};

const SignUpForm = () => {
  const { setIsSignUpModalOpen, isSignUpModalOpen } = useUiStore();
  const { register, formState, handleSubmit, getValues } =
    useForm<SignUpFormValues>({
      defaultValues: {
        email: '',
        password: '',
        passwordConfirm: '',
      },
    });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { isSubmitting, errors } = formState;

  const handleSignUp = async (data: SignUpFormValues) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(fireauth, email, password)
      .then((userCredential) => {
        const todoLocal = localStorage.getItem('todos');

        if (todoLocal) {
          const parsedTodoLocal = JSON.parse(todoLocal);
          parsedTodoLocal.forEach(async (todo: TodoType) => {
            const payload: TodoType = {
              ...todo,
              userId: userCredential.user.uid,
            };

            await setDoc(doc(firestore, 'todos', todo.id), payload);
          });
        }

        localStorage.removeItem('todos');

        setIsSignUpModalOpen(!isSignUpModalOpen);
      })
      .catch((e: FirebaseError) => {
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case 'auth/email-already-in-use':
              setErrorMessage('Email already in use.');
              break;
            default:
              console.error('Firebase Error:', e);
          }
        } else {
          console.error('Non-Firebase Error:', e);
        }
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSignUp)}>
      <Illustration />
      <Typography variant='h5' fontWeight={'bold'}>
        Sign Up
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        Save your todos across devices
      </Typography>
      <Stack spacing={2}>
        {errorMessage && (
          <Alert variant='standard' severity='error'>
            {errorMessage}
          </Alert>
        )}
        <TextField
          id='email'
          placeholder='Email address'
          variant='outlined'
          size='small'
          type='email'
          {...register('email', {
            required: 'Email is required',

            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />

        <TextField
          id='password'
          placeholder='Password'
          variant='outlined'
          size='small'
          type='password'
          {...register('password', {
            required: 'Password is required',
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          id='passwordConfirm'
          placeholder='Password confirm'
          variant='outlined'
          size='small'
          type='password'
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === getValues('password') || 'Password does not match',
          })}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message}
        />

        <Button type='submit' variant='contained' disabled={isSubmitting}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignUpForm;
