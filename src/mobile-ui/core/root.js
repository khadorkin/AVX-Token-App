import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Platform } from 'components/core';
import { ConnectedRouter } from 'connected-react-router';

import theme from 'theme';
import { store } from '../store';
import App from './app';
import history from '../store/history';

let Root = props => (
  <Provider store={store} {...props}>
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ThemeProvider>
  </Provider>
);

if (Platform.OS === 'web') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  Root = require('react-hot-loader').hot(module)(Root); // eslint-disable-line global-require
}

const AppRoot = Root;
export default AppRoot;
