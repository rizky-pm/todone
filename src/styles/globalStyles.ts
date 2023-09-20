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

  li,
  ul {
    text-decoration: none;
    list-style: none;
  }

  .container {
    padding: 32px;
  }

  .section {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 16px;
    border-radius: 4px;
  }
`;

export default globalStyles;
