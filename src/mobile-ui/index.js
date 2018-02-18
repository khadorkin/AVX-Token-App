import 'babel-polyfill';

import { AppRegistry, NativeModules, Platform } from 'react-native';

import 'styles';
import Root from './core/root';
import webWorker from './api/webworker';

window.__ = t => t; // eslint-disable-line

AppRegistry.registerComponent('avx.token.app', () => Root);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('avx.token.app', {
    initialProps: {},
    rootTag: document.getElementById('avx.token.app'),
  });
  if (process.env.API_SERVER.indexOf('webworker') === 0) {
    webWorker(process.env.API_SERVER.slice(10));
  }
} else {
  // eslint-disable-next-line no-lonely-if
  if (__DEV__) {
    if (NativeModules.DevSettings) {
      NativeModules.DevSettings.setIsDebuggingRemotely(true);
    }
  }
}
