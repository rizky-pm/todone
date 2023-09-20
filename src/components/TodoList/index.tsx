import { Checkbox } from '@mui/material';
import TodoListStyled from './todoList.styled';
import { TodoType } from '../../../common';
import TrashIcon from '../../assets/TrashIcon';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';

type ComponentProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = ({ todos, setTodos }: ComponentProps) => {
  const user = useFirebaseAuth();

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
      // const updatedTodos = todos.filter((item) => item.id !== todoId);
      // localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodos((prevState) => prevState.filter((item) => item.id !== todoId));
    }
  };

  return (
    <TodoListStyled isAnyTodo={todos.length}>
      {todos.length ? (
        todos.map((todo: TodoType) => (
          <li className='todo' key={todo.id}>
            <span className={`${todo.isDone ? 'todo--done' : ''}`}>
              {todo.title}
            </span>
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
          </li>
        ))
      ) : (
        <p className='empty-todo-msg'>Currently no todo.</p>
      )}
    </TodoListStyled>
  );
};

export default TodoList;
