import React from 'react';
import { StatusBar } from 'react-native';
// import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import Header from 'components/header';
// import ModalRouter from 'modals/modalRouter';

import theme from 'styles/vars';
import Router from '../router';

const Window = styled.View`
  display: flex;
  flex-direction: column;
`;

class App extends React.PureComponent {
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
          <StatusBar hidden={false} translucent={false} networkActivityIndicatorVisible={false} backgroundColor="white" barStyle="dark-content" />
          <Header />
          <Router />
          {/*<ModalRouter />*/}
        </Window>
      </ThemeProvider>
    );
  }
}

export default App;
