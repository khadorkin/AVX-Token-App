import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Platform } from 'components/core';
import { ConnectedRouter } from 'connected-react-router';

import theme from 'theme';
import { store } from '../store';
import App from './app';
import history from '../store/history';

class AppProvider extends React.PureComponent {
  render() {
    return (
      <Provider store={store} {...this.props}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

let HotProvider = AppProvider;
if (Platform.OS === 'web') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  HotProvider = require('react-hot-loader').hot(module)(AppProvider); // eslint-disable-line global-require
}

const ConstProvider = HotProvider;
export default ConstProvider;
