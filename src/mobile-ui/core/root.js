import React from 'react';
import Splash from 'components/splash';
import { StateComponent } from 'components/react';

export default class Root extends StateComponent {
  state = {};

  componentDidMount() {
    import(/* webpackChunkName: "app" */
    './provider').then(provider => {
      this.setState({
        Provider: provider.default,
      });
    });
  }

  render() {
    const { Provider } = this.state;
    if (!Provider) {
      return <Splash {...this.props} />;
    }
    return <Provider {...this.props} />;
  }
}
