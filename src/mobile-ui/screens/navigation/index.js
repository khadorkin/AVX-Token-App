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
    },
    {
      screen: 'tab.trending',
      title: 'Trending',
    },
    {
      screen: 'tab.wallet',
      title: 'Wallet',
    },
    {
      screen: 'tab.preferences',
      title: 'Preferences',
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
