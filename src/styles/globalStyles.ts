import { css } from '@emotion/react';

export const globalStyles = css`
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
    padding: 2rem;
  }

  .section {
    box-shadow: rgba(0, 0, 0, 0.16) 0rem 0.0625rem 0.25rem;
    padding: 1rem;
    border-radius: 0.25rem;
  }
`;
