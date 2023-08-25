import { createTheme } from '@mui/material/styles';

export const darkThemeFactory = () =>
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#72AFAB',
      },
      secondary: {
        main: '#ba4646',
      },
      background: {
        default: '#242526',
        paper: '#242526',
      },
      info: {
        main: '#3d5f76',
      },
    },
  });

export const lightThemeFactory = () =>
  createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#72AFAB',
      },
      secondary: {
        main: '#ba4646',
      },
      info: {
        main: '#3d5f76',
      },
      background: {
        default: '#fafafa',
        paper: '#fafafa',
      },
    },
  });
