import styled from '@emotion/styled';

type TodoListProps = {
  isAnyTodo: number;
};

const TodoListStyled = styled.ul<TodoListProps>`
  height: 50vh;
  overflow: auto;

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
`;

export default TodoListStyled;
