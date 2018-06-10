/* eslint-disable import/prefer-default-export */
/* eslint-disable global-require */
import { Navigation } from 'react-native-navigation';

export function registerScreens(store, Provider) {
  Navigation.registerComponent(
    'DrawerButton',
    () => require('./_global/TitlebarButton').DrawerButton
  );
  // Navigation.registerComponent('BackButton', () => require('./_global/TitlebarButton').BackButton);

  // Navigation.registerComponent('avxtokenapp.Videos', () => Videos, store, Provider);
  Navigation.registerComponent(
    'avxtokenapp.VideosList/Detail',
    () => require('./videos/Detail').default,
    store,
    Provider
  );
  Navigation.registerComponent(
    'avxtokenapp.VideosList',
    () => require('./videos/List').default,
    store,
    Provider
  );
  Navigation.registerComponent(
    'avxtokenapp.VideosTrending',
    () => require('./videos/Trending').default,
    store,
    Provider
  );
  Navigation.registerComponent(
    'avxtokenapp.Wallet',
    () => require('./wallet/Wallet').default,
    store,
    Provider
  );
  Navigation.registerComponent(
    'avxtokenapp.Preferences',
    () => require('./prefs/Preferences').default,
    store,
    Provider
  );

  // Parts
  Navigation.registerComponent('avxtokenapp.Titlebar', () => require('./_global/TitleBar'));
  Navigation.registerComponent('avxtokenapp.Drawer', () => require('./drawer/Drawer').default);
}
