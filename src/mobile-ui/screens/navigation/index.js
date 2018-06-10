import Navigator from './navigator';

const appConfig = {
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
      screen: 'avxtokenapp.VideosList',
      title: 'Videos',
    },
    {
      screen: 'avxtokenapp.VideosTrending',
      title: 'Trending',
    },
    {
      screen: 'avxtokenapp.Wallet',
      title: 'Wallet',
    },
    {
      screen: 'avxtokenapp.Preferences',
      title: 'Preferences',
    },
  ],
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
};

export const navigator = new Navigator(appConfig);

export const AppConfig = async () => {
  const [initialTab] = await navigator.findCurrentTab();
  if (initialTab !== -1) {
    const [tab] = appConfig.tabs.splice(initialTab, 1);
    appConfig.tabs.splice(0, 0, tab);
  }
  return appConfig;
};
