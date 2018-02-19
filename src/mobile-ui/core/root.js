import React from 'react';
import Splash from 'components/splash';

export default class Root extends React.Component {
  state = {};

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        // eslint-disable-next-line global-require
        Provider: require('./provider').default,
      });
    }, 1);
  }

  render() {
    const { Provider } = this.state;
    if (!Provider) {
      return <Splash {...this.props} />;
    }
    return <Provider {...this.props} />;
  }
}
