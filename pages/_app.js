import { useMemo } from 'react';
import { Provider } from "next-auth/client";
// import '@zeit-ui/style'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey, yellow, blueGrey } from "@material-ui/core/colors";
import styles from './App.scss';

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: [
            'Bebas Nueue',
            'Montserrat'
          ]
        },
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: yellow,
          secondary: blueGrey,
        },
        overrides: {
          MuiStepper: {
            root: {
              backgroundColor: 'transparent',
            }
          }
        }
      }),
    [prefersDarkMode],
  );

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
