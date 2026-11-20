import '../styles/globals.css';
import Head from 'next/head';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tweets from '../reducers/tweets';
import user from '../reducers/user';

const store = configureStore({
  reducer: { tweets, user },
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>Hackatweet</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
