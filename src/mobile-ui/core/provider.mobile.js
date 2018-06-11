/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import { Provider as Redux } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import { getHistory } from '../store/history';

const history = getHistory();

export class ScreenProvider extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <Redux {...props}>
        <ThemeProvider theme={theme}>{this.props.children}</ThemeProvider>
      </Redux>
    );
  }
}

export class AppProvider extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <ScreenProvider {...props}>
        <ConnectedRouter history={history}>{this.props.children}</ConnectedRouter>
      </ScreenProvider>
    );
  }
}
