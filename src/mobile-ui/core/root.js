import React from 'react';
import { Provider } from 'react-redux';
import { Platform } from 'react-native';
import { BrowserRouter, NativeRouter } from 'react-router-native';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line import/no-extraneous-dependencies

import { store } from '../store';
import AppRouter from './app';

const isBrowser = Platform.OS === 'web';

function Root(props) {
  return (
    <Provider store={store} {...props}>
      <NativeRouter>
        <AppRouter />
      </NativeRouter>
    </Provider>
  );
}

function HotRoot(props) {
  return (
    <AppContainer>
      <Provider store={store} {...props}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  );
}

export default (isBrowser ? HotRoot : Root);
