import '../styles/globals.css';
import Head from 'next/head';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hackatweet</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
