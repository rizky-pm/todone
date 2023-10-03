import { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Checkbox,
  Stack,
  Skeleton,
  useMediaQuery,
} from '@mui/material';

import TodoListStyled from './todoList.styled';
import { TodoType } from '../../../common';
import TrashIcon from '../../assets/TrashIcon';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import TodoTab from '../TodoTab';

type ComponentProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  isFetchingTodos: boolean;
};

const label = { inputProps: { 'aria-label': 'Mark todo' } };

function a11yProps(index: number) {
  return {
    id: `todos-filter-${index}`,
    'aria-controls': `todos-filter-panel-${index}`,
  };
}

const TodoList = ({ todos, setTodos, isFetchingTodos }: ComponentProps) => {
  const [value, setValue] = useState(0);
  const [completedTodos, setCompletedTodos] = useState<TodoType[]>([]);
  const [uncompleteTodos, setUncompleteTodos] = useState<TodoType[]>([]);
  const { user } = useFirebaseAuth();
  const isSmallDevice = useMediaQuery('(max-width:600px)');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const isChecked = event.target.checked;

    if (user) {
      const todoDocRef = doc(firestore, 'todos', todoId);

      try {
        await updateDoc(todoDocRef, {
          isDone: isChecked,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, isDone: isChecked };
        }
        return todo;
      });

      setTodos(updatedTodos);
    }
  };

  const handleDelete = async (todoId: string) => {
    if (user) {
      try {
        await deleteDoc(doc(firestore, 'todos', todoId));
      } catch (e) {
        console.log(e);
      }
    } else {
      setTodos((prevState) => prevState.filter((item) => item.id !== todoId));
    }
  };

  useEffect(() => {
    setCompletedTodos(() => todos.filter((todo) => todo.isDone === true));
    setUncompleteTodos(() => todos.filter((todo) => todo.isDone === false));
  }, [todos]);

  return (
    <>
      <Box borderBottom={1} borderColor={'divider'}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label='Todos filter'
          centered={isSmallDevice ? false : true}
          variant={isSmallDevice ? 'scrollable' : 'standard'}
          scrollButtons={isSmallDevice ? true : false}
          allowScrollButtonsMobile={isSmallDevice ? true : false}
        >
          <Tab label='All' {...a11yProps(0)} />
          <Tab label='Completed' {...a11yProps(1)} />
          <Tab label='Uncomplete' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TodoListStyled
        isAnyTodo={todos.length}
        isFetchingTodos={isFetchingTodos}
      >
        <Box>
          <TodoTab value={value} index={0}>
            <Stack spacing={2}>
              {isFetchingTodos ? (
                <>
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                </>
              ) : todos.length ? (
                todos.map((todo: TodoType) => (
                  <div className='todo' key={todo.id}>
                    <p
                      className={`todo__title ${
                        todo.isDone ? 'todo--done' : ''
                      }`}
                    >
                      {todo.title}
                    </p>
                    <TrashIcon
                      w='22px'
                      h='22px'
                      marginLeft='auto'
                      onClickHandler={handleDelete}
                      todoId={todo.id}
                    />
                    <Checkbox
                      className='todo__checkbox'
                      checked={todo.isDone}
                      {...label}
                      onChange={(e) => {
                        handleChange(e, todo.id);
                      }}
                    />
                  </div>
                ))
              ) : (
                'No todos. Time to start anew!'
              )}
            </Stack>
          </TodoTab>
          <TodoTab value={value} index={1}>
            <Stack spacing={2}>
              {isFetchingTodos ? (
                <>
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                </>
              ) : completedTodos.length ? (
                completedTodos.map((todo: TodoType) => (
                  <div className='todo' key={todo.id}>
                    <p
                      className={`todo__title ${
                        todo.isDone ? 'todo--done' : ''
                      }`}
                    >
                      {todo.title}
                    </p>
                    <TrashIcon
                      w='22px'
                      h='22px'
                      marginLeft='auto'
                      onClickHandler={handleDelete}
                      todoId={todo.id}
                    />
                    <Checkbox
                      className='todo__checkbox'
                      checked={todo.isDone}
                      {...label}
                      onChange={(e) => {
                        handleChange(e, todo.id);
                      }}
                    />
                  </div>
                ))
              ) : (
                'Sadly, there are no completed todos at the moment.'
              )}
            </Stack>
          </TodoTab>
          <TodoTab value={value} index={2}>
            <Stack spacing={2}>
              {isFetchingTodos ? (
                <>
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                  <Skeleton variant='rectangular' height={55} />
                </>
              ) : uncompleteTodos.length ? (
                uncompleteTodos.map((todo: TodoType) => (
                  <div className='todo' key={todo.id}>
                    <p
                      className={`todo__title ${
                        todo.isDone ? 'todo--done' : ''
                      }`}
                    >
                      {todo.title}
                    </p>
                    <TrashIcon
                      w='22px'
                      h='22px'
                      marginLeft='auto'
                      onClickHandler={handleDelete}
                      todoId={todo.id}
                    />
                    <Checkbox
                      className='todo__checkbox'
                      checked={todo.isDone}
                      {...label}
                      onChange={(e) => {
                        handleChange(e, todo.id);
                      }}
                    />
                  </div>
                ))
              ) : (
                "All done! Now, let's add more."
              )}
            </Stack>
          </TodoTab>
        </Box>
      </TodoListStyled>
    </>
  );
};

export default TodoList;
