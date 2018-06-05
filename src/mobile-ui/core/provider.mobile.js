/* eslint-disable react/prop-types */
import React from 'react';
import { Provider as Redux } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import theme from 'theme';

class AppProvider extends React.PureComponent {
  render() {
    const { children, ...props } = this.props;
    return (
      <Redux {...props}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Redux>
    );
  }
}

export const Provider = AppProvider;
