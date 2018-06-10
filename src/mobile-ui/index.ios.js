import React from 'react'; // eslint-disable-line
import { AppRegistry } from 'react-native'; // eslint-disable-line
import { Navigation } from 'react-native-navigation';

import { Provider } from './core/provider.mobile';
import { registerScreens } from './screens';
import { store } from './store';
import { AppConfig } from './screens/navigation';

registerScreens(store, Provider);

const start = async () => {
  const appConfig = await AppConfig();
  Navigation.startTabBasedApp(appConfig);
};
start();
