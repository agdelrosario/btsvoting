import { Provider } from "next-auth/client";
import '@zeit-ui/style'
import styles from './App.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
