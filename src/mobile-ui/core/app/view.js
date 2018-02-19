import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, Text } from 'components/core';
// import ReactModal from 'react-modal';
import Header from 'components/header';
// import ModalRouter from 'modals/modalRouter';

import Routes from '../routes';

const Window = View.extend`
  display: flex;
  flex-direction: column;
`;

class App extends React.Component {
  static propTypes = {
    alertError: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.mainContent = undefined;
    this.state = { error: null, errorInfo: null };
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

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error(error);
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
  }

  renderWithError() {
    return (
      <Window id="window">
        <StatusBar
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Text>{JSON.stringify(this.state.errorInfo)}</Text>
      </Window>
    );
  }

  render() {
    if (this.state.error) {
      return this.renderWithError();
    }
    return (
      <Window id="window">
        <StatusBar
          hidden={false}
          translucent={false}
          networkActivityIndicatorVisible={false}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <Header />
        <Routes />
        {/*<ModalRouter />*/}
      </Window>
    );
  }
}

export default App;
