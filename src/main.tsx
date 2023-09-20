import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Global, ThemeProvider } from '@emotion/react';

import globalStyles from './styles/globalStyles.ts';
import theme from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
