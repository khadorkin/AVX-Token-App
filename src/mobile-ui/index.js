/* eslint-disable global-require */
import React from 'react'; // eslint-disable-line
import { AppRegistry, NativeModules, NativeEventsReceiver, Platform } from 'react-native'; // eslint-disable-line
import { Navigation } from 'react-native-navigation';
import { applyInitialLocation, connectedRouter } from 'redux/router';

import Theme from 'theme';
import { registerScreens } from './screens';
import { createStore } from './store';
import { AppConfig } from './screens/navigation';
import { createHistory } from './store/history';

if (__DEV__) {
  if (NativeModules.DevSettings) {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  }
}

const start = async () => {
  const [history] = await Promise.all([createHistory(), Theme.load()]);
  const store = createStore(history);

  connectedRouter(store, history, AppConfig);
  await applyInitialLocation();

  const provider = require('./core/provider.mobile');
  registerScreens(store, provider);
  Navigation.startTabBasedApp(AppConfig);
};

if (Platform.OS === 'android') {
  Navigation.isAppLaunched().then(appLaunched => {
    if (appLaunched) {
      start();
    }
    new NativeEventsReceiver().appLaunched(start);
  });
} else {
  start();
}
