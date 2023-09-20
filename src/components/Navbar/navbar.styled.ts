import styled from '@emotion/styled';

export const Nav = styled.nav`
  padding: 16px 32px;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary};
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-size: large;

  ul {
    display: flex;
    gap: 20px;
  }
`;
