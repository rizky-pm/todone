import { Checkbox } from '@mui/material';
import TodoListStyled from './todoList.styled';
import { TodoType } from '../../../common';
import TrashIcon from '../../assets/TrashIcon';

type ComponentProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = ({ todos, setTodos }: ComponentProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    todo: TodoType
  ) => {
    const isChecked = event.target.checked;

    setTodos((prevState: TodoType[]) => {
      return prevState.map((state) => {
        if (state.id === todo.id) {
          return {
            ...state,
            isDone: isChecked,
          };
        } else {
          return state;
        }
      });
    });
  };

  const handleDelete = (todoId: string) => {
    setTodos((prevState) => prevState.filter((item) => item.id !== todoId));
  };

  return (
    <TodoListStyled>
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
                handleChange(e, todo);
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
