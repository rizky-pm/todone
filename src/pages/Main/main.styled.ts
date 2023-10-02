import styled from '@emotion/styled';

const MainPage = styled.main`
  padding: 2rem;

  @media ${(props) => props.theme.mediaQueries.xs} {
    padding: 1rem;
  }

  .title {
    text-align: center;
  }
`;

export default MainPage;
