import styled from '@emotion/styled';

type TodoListProps = {
  isAnyTodo: number;
};

const TodoListStyled = styled.ul<TodoListProps>`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 50vh;
  overflow: auto;

  justify-content: ${(props) => (props.isAnyTodo > 0 ? '' : 'center')};

  .todo {
    padding: 12px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .todo--done {
      text-decoration: line-through;
    }

    .todo__checkbox {
      margin-left: 8px;
    }
  }

  .empty-todo-msg {
    text-align: center;
  }
`;

export default TodoListStyled;
