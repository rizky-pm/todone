import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderEmotion } from '@emotion/react';

import globalStyles from './styles/globalStyles.ts';
import muiTheme from './styles/muiTheme.ts';
import theme from './styles/theme.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProviderEmotion theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <Global styles={globalStyles} />
        <App />
      </ThemeProvider>
    </ThemeProviderEmotion>
  </React.StrictMode>
);
