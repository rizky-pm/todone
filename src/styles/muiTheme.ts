import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: 'small',
      },
      styleOverrides: {
        root: {
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontWeight: 'bold',
        },
      },
    },
  },
  palette: {
    common: {
      black: '#0d1821',
      white: '#ffffff',
    },
    primary: {
      dark: '#28679b',
      main: '#3993DD',
      light: '#74b3e7',
    },
  },
});

export default muiTheme;
