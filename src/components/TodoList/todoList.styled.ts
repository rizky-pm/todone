import styled from '@emotion/styled';

type TodoListProps = {
  isAnyTodo: number;
  isFetchingTodos: boolean;
};

const TodoListStyled = styled.div<TodoListProps>`
  height: 50vh;
  overflow: ${(props) => (props.isFetchingTodos ? 'hidden' : 'auto')};

  .todo {
    padding: 0.75rem;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 0.0625rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      text-align: left;
      max-width: 75%;
      word-wrap: break-word;

      @media ${(props) => props.theme.mediaQueries.xs} {
        font-size: 0.875rem;
      }
    }

    .todo--done {
      text-decoration: line-through;
    }

    .todo__checkbox {
      margin-left: 0.5rem;
    }
  }
`;

export default TodoListStyled;
