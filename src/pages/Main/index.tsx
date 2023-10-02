import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Container,
  Button,
  TextField,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  QuerySnapshot,
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

import { firestore } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import MainPage from './main.styled';
import { TodoType } from '../../../common';
import TodoList from '../../components/TodoList';
import SignInModal from '../../components/SignInModal';
import SignUpModal from '../../components/SignUpModal';

type TodoFormValues = {
  title: string;
};

const Main = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const user = useFirebaseAuth();
  const isSmallDevice = useMediaQuery('(max-width:600px)');

  const { register, formState, handleSubmit, reset } = useForm<TodoFormValues>({
    defaultValues: {
      title: '',
    },
  });
  const { isSubmitting, errors } = formState;

  const handleAddTodo = async (data: TodoFormValues) => {
    const randomUUID = uuidv4();

    if (user) {
      const payload: TodoType = {
        ...data,
        id: randomUUID,
        userId: user?.uid,
        isDone: false,
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(firestore, 'todos', randomUUID), payload);
    } else {
      const payload: TodoType = {
        ...data,
        id: randomUUID,
        isDone: false,
        createdAt: Timestamp.now(),
      };

      const todoLocal = localStorage.getItem('todos');
      const todosArray = todoLocal ? JSON.parse(todoLocal) : [];
      const tempTodos = [payload, ...todosArray];
      setTodos(tempTodos);
      localStorage.setItem('todos', JSON.stringify(tempTodos));
    }

    reset();
  };

  useEffect(() => {
    if (user === null) {
      const todoLocal = localStorage.getItem('todos');
      setTodos(todoLocal ? JSON.parse(todoLocal) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, 'todos'),
          where('userId', '==', user?.uid),
          orderBy('createdAt')
        ),
        (snapshot: QuerySnapshot) => {
          const todoList: TodoType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data() as TodoType;
            todoList.push(data);
          });
          setTodos(todoList);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  return (
    <MainPage>
      <Container maxWidth='sm'>
        <Stack spacing={2}>
          <Stack spacing={2}>
            <Typography
              // variant='h6'
              fontWeight={600}
              variant={isSmallDevice ? 'h6' : 'h5'}
              gutterBottom
              className='title'
            >
              Task Tracking Made Effortless.
            </Typography>
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
          </Stack>

          <div className='section'>
            <TodoList todos={todos} setTodos={setTodos} />
          </div>
        </Stack>
      </Container>
      <SignInModal />
      <SignUpModal />
    </MainPage>
  );
};

export default Main;
