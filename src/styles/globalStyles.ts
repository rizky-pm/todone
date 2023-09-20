import { css } from '@emotion/react';

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background-color: #ffffff;
    color: #0d1821;
  }

  .container {
    padding: 32px;
  }

  li,
  ul {
    text-decoration: none;
    list-style: none;
  }
`;

export default globalStyles;
