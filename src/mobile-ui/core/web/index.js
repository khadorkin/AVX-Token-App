import React from 'react';
import Splash from 'components/splash';
import App from './App';

class WebApplication extends React.Component {
  state = {};

  componentDidMount() {
    import(/* webpackChunkName: "app" */
    '../provider').then(provider => {
      this.setState({
        Provider: provider.default,
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const shouldUpdate = this.state !== nextState || this.props !== nextProps;
    return shouldUpdate;
  }

  render() {
    const { Provider } = this.state;
    if (!Provider) {
      return <Splash />;
    }
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}

// eslint-disable-next-line import/no-extraneous-dependencies
const HotWebApplication = require('react-hot-loader').hot(module)(WebApplication);

export default HotWebApplication;
