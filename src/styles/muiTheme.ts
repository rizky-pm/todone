import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  typography: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontWeightRegular: 400, // Default is 400 (normal)
    fontWeightMedium: 500, // Default is 500 (medium)
    fontWeightBold: 600, // Default is 600 (bold)
  },
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
