import '@babel/polyfill';

// import React from 'react';
// import { View } from 'react-native';
import { AppRegistry, NativeModules, Platform } from 'react-native';

import 'styles';
// const Root = () => <View />;
import Root from './core/root';
import webWorker from './api/webworker';

window.__ = t => t; // eslint-disable-line

AppRegistry.registerComponent('avxtokenapp', () => Root);

if (Platform.OS === 'web') {
  AppRegistry.runApplication('avxtokenapp', {
    initialProps: {},
    rootTag: document.getElementById('avxtokenapp'),
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
