import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Container, Button, TextField, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Timestamp } from 'firebase/firestore';

import MainPage from './main.styled';
import { TodoType } from '../../../common';
import TodoList from '../../components/TodoList';

type TodoFormValues = {
  title: string;
};

const Main = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const { register, formState, handleSubmit, reset } = useForm<TodoFormValues>({
    defaultValues: {
      title: '',
    },
  });
  const { isSubmitting, errors } = formState;

  const handleAddTodo = (data: TodoFormValues) => {
    const randomUUID = uuidv4();
    const payload: TodoType = {
      ...data,
      id: randomUUID,
      isDone: false,
      createdAt: Timestamp.now(),
    };

    setTodos((prevState) => [payload, ...prevState]);
    reset();
  };

  return (
    <MainPage>
      <div className='container'>
        <Container maxWidth='sm'>
          <Stack spacing={2}>
            <div className='section'>
              <h1 className='title'>todone</h1>
              <form onSubmit={handleSubmit(handleAddTodo)} noValidate>
                <Stack spacing={1}>
                  <TextField
                    id='todoTitle'
                    variant='outlined'
                    fullWidth
                    size='small'
                    placeholder='Your todo'
                    {...register('title', {
                      required: 'Todo is required',
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={isSubmitting}
                  >
                    Add Todo
                  </Button>
                </Stack>
              </form>
            </div>

            <div className='section'>
              <TodoList todos={todos} setTodos={setTodos} />
            </div>
          </Stack>
        </Container>
      </div>
    </MainPage>
  );
};

export default Main;
