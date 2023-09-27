import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import useUiStore from '../../state/ui/uiStore';

import { fireauth } from '../../config/firebase';

type SignUpFormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
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

  const { isSubmitting, errors } = formState;

  const handleSignUp = async (data: SignUpFormValues) => {
    const { email, password } = data;
    createUserWithEmailAndPassword(fireauth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        setIsSignUpModalOpen(!isSignUpModalOpen);
      })
      .catch((e) => console.log(e));
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSignUp)}>
      <Typography variant='h5' fontWeight={'bold'}>
        Sign Up
      </Typography>
      <Typography variant='subtitle2' gutterBottom>
        Save your todos across devices
      </Typography>
      <Stack spacing={2}>
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
