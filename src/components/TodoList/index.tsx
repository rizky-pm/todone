import { Checkbox } from '@mui/material';
import TodoListStyled from './todoList.styled';
import { TodoType } from '../../../common';

type ComponentProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = ({ todos, setTodos }: ComponentProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setTodos((prevState) => prevState.filter((item) => item.id !== id));
    }
  };

  return (
    <TodoListStyled>
      {todos.length ? (
        todos.map((todo: TodoType) => (
          <li className='todo' key={todo.id}>
            {todo.title}
            <Checkbox
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
