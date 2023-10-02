import styled from '@emotion/styled';

export const Nav = styled.nav`
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 0.125rem solid ${(props) => props.theme.colors.primary};
  font-weight: bold;

  ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.25rem;
  }

  .logo {
    margin-right: auto;
    font-size: 1.5rem;

    @media ${(props) => props.theme.mediaQueries.xs} {
      font-size: 20px;
    }
  }

  @media ${(props) => props.theme.mediaQueries.xs} {
    padding: 0.75rem 1rem;
  }

  @media ${(props) => props.theme.mediaQueries.m} {
    padding: 0.75rem 2rem;
  }
`;
