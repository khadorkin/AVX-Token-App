import React from 'react'; // eslint-disable-line
import { AppRegistry } from 'react-native'; // eslint-disable-line
import { Navigation } from 'react-native-navigation';

import { Provider } from './core/provider.mobile';
import { registerScreens } from './screens';
import { store } from './store';

registerScreens(store, Provider);

const navigatorStyle = {
  navBarTranslucent: true,
  drawUnderNavBar: true,
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  statusBarTextColorScheme: 'light',
  drawUnderTabBar: true,
};

Navigation.startSingleScreenApp({
  animationType: 'fade',
  passProps: {},
  screen: {
    screen: 'avxtokenapp.VideosList',
    title: 'Videos',
    navigatorStyle,
    // leftButtons: [
    //   {
    //     id: 'sideMenu',
    //   },
    // ],
  },
  drawer: {
    left: {
      screen: 'avxtokenapp.Drawer',
    },
    // ( iOS only )
    style: {
      // optional, add this if you want a side menu drawer shadow
      drawerShadow: true,
      // optional, add this if you want a overlay color when drawer is open
      contentOverlayColor: 'rgba(0,0,0,0.25)',
    },
    // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
    type: 'MMDrawer',
    // optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
    // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
    animationType: 'slide',
  },
});
