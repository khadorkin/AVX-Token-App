import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
// import ReactModal from 'react-modal';
import styled, { ThemeProvider } from 'styled-components';
import Header from 'components/header';
// import ModalRouter from 'modals/modalRouter';

import theme from 'styles/vars';
import Router from '../router';

const Window = styled.View`
  display: flex;
  flex-direction: column;
`;

class App extends React.PureComponent {
  static propTypes = {
    alertError: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.mainContent = undefined;
  }

  componentWillMount() {
    const { alertError } = this.props;

    if (window.document) {
      document.addEventListener('unhandledError', event => {
        alertError(event.detail);
      });
    }
  }

  componentWillReceiveProps(props) {
    this.setTitleFromProps(props);
  }

  componentWillUnmount() {
    this.mainContent.removeEventListener('scroll', this.scrollListener);
  }

  setTitleFromProps(props) {
    if (window.document) {
      window.document.title = props.pageTitle || 'AVX Token App';
    }
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Window id="window" theme={theme}>
          <StatusBar
            hidden={false}
            translucent={false}
            networkActivityIndicatorVisible={false}
            backgroundColor="white"
            barStyle="dark-content"
          />
          <Header />
          <Router />
          {/*<ModalRouter />*/}
        </Window>
      </ThemeProvider>
    );
  }
}

export default App;
