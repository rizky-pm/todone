import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      black: string;
      white: string;
      primary: string;
      primaryDark: string;
      primaryLight: string;
    };
    mediaQueries: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
