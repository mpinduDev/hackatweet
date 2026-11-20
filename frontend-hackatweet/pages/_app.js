import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import tweets from '../reducers/tweets';
import user, { restoreUser } from '../reducers/user';

const store = configureStore({
  reducer: { tweets, user },
});

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    const currentUser = store.getState().user.value;
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  });
}

function App({ Component, pageProps }) {
  useEffect(() => {
    let savedUser = null;
    try {
      savedUser = JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      savedUser = null;
    }
    store.dispatch(restoreUser(savedUser));
  }, []);

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
