import 'babel-polyfill';

// todo: figure out how to do this right in production
// eslint-disable-next-line
import 'react-hot-loader/patch';

import { AppRegistry } from 'react-native';
// import { utils } from 'react-universal-ui';
import App from './app';

const utils = {
  isBrowser: process.env.BROWSER || false,
};

AppRegistry.registerComponent('app', () => App);

if (utils.isBrowser) {
  AppRegistry.runApplication('app', {
    initialProps: {},
    rootTag: document.getElementById('app'),
  });
}
