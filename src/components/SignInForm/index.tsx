import { useForm } from 'react-hook-form';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { fireauth } from '../../config/firebase';
import useUiStore from '../../state/ui/uiStore';

type SignInFormValues = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const { setIsSignInModalOpen, isSignInModalOpen } = useUiStore();
  const { register, formState, handleSubmit } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isSubmitting, errors } = formState;

  const handleSignIn = async (data: SignInFormValues) => {
    const { email, password } = data;

    signInWithEmailAndPassword(fireauth, email, password)
      .then(() => {
        setIsSignInModalOpen(!isSignInModalOpen);
        localStorage.removeItem('todos');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSignIn)}>
      <Typography variant='h5' fontWeight={'bold'}>
        Sign In
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

        <Button type='submit' variant='contained' disabled={isSubmitting}>
          Sign In
        </Button>
      </Stack>
    </form>
  );
};

export default SignInForm;
