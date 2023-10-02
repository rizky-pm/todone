import styled from '@emotion/styled';

const MainPage = styled.main`
  padding: 32px;

  @media ${(props) => props.theme.mediaQueries.xs} {
    padding: 16px;
  }

  .title {
    text-align: center;
  }
`;

export default MainPage;
