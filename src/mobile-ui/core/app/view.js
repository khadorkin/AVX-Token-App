import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'components/core';
// import ReactModal from 'react-modal';
import Header from 'components/header';
// import ModalRouter from 'modals/modalRouter';
import styled from 'styled-components';

import Routes from '../routes';

class App extends React.PureComponent {
  static propTypes = {
    alertError: PropTypes.func.isRequired,
  };

  componentWillMount() {
    if (window.document) {
      document.addEventListener('unhandledError', this.unhandledError);
    }
  }

  componentWillReceiveProps(props) {
    this.setTitleFromProps(props);
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error);
    // Catch errors in any components below and re-render with error message
    this.unhandledError({
      detail: [errorInfo || error],
    });
  }

  componentWillUnmount() {
    // this.mainContent.removeEventListener('scroll', this.scrollListener);
    if (window.document) {
      document.removeEventListener('unhandledError', this.unhandledError);
    }
  }

  setTitleFromProps(props) {
    if (window.document) {
      window.document.title = props.pageTitle || 'AVX Token App';
    }
  }

  unhandledError = event => {
    const { alertError } = this.props;
    alertError(event.detail);
  };

  render() {
    return [
      <StatusBar
        key="statusbar"
        hidden={false}
        translucent={false}
        networkActivityIndicatorVisible={false}
        backgroundColor="white"
        barStyle="dark-content"
      />,
      <Header key="header" />,
      <Routes key="routes" />,
      // <ModalRouter />,
    ];
  }
}

export default styled(App)`
  display: flex;
  flex-direction: column;
`;
