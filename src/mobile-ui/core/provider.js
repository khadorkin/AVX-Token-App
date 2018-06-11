/* eslint-disable react/prop-types */

import React from 'react';
import { Provider as Redux } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';
import { ConnectedRouter } from 'connected-react-router';
import { getHistory } from '../store/history';
import { getStore } from '../store';

const history = getHistory();
const store = getStore();

class AppProvider extends React.PureComponent {
  render() {
    return (
      <Redux store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>{this.props.children}</ConnectedRouter>
        </ThemeProvider>
      </Redux>
    );
  }
}

export default AppProvider;
