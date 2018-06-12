const icon = require('./icon.png');
export const AppConfig = {
  animationType: 'fade',
  passProps: {},
  appStyle: {
    drawUnderNavBar: true,
    drawUnderTabBar: true,
    navBarButtonColor: 'white',
    navBarTextColor: 'white',
    navBarTranslucent: true,
    screenBackgroundColor: '#0a0a0a',
    statusBarTextColorScheme: 'light',
    tabBarHidden: true,
  },
  tabs: [
    {
      screen: 'tab.video',
      title: 'Videos',
      icon,
    },
    {
      screen: 'tab.trending',
      title: 'Trending',
      icon,
    },
    {
      screen: 'tab.wallet',
      title: 'Wallet',
      icon,
    },
    {
      screen: 'tab.preferences',
      title: 'Preferences',
      icon,
    },
  ],
  drawer: {
    left: {
      screen: 'structure.Drawer',
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
};
