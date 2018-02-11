import 'babel-polyfill';

import { AppRegistry, NativeModules, Platform } from 'react-native';

import 'styles';
import Root from './core/root';
import webWorker from './api/webworker';

window.__ = t => t; // eslint-disable-line

AppRegistry.registerComponent('app', () => Root);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('app', {
    initialProps: {},
    rootTag: document.getElementById('app'),
  });
  if (process.env.API_SERVER.indexOf('webworker') === 0) {
    webWorker(process.env.API_SERVER.slice(10));
  }
} else {
  // eslint-disable-next-line no-lonely-if
  if (__DEV__) {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  }
}
