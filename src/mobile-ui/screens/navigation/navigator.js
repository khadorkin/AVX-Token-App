import { ScreenVisibilityListener as RNNScreenVisibilityListener } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';

const indexOf = (arr, test, def = 0) => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (test(arr[i])) {
      return i;
    }
  }
  return def;
};

export default class ScreenVisibilityListener {
  constructor(appConfig) {
    this.appConfig = appConfig;
    this.listener = new RNNScreenVisibilityListener({
      didAppear: ({ screen }) => {
        if (screen === 'avxtokenapp.Drawer') {
          return;
        }
        AsyncStorage.setItem('Navigator.lastScreen', screen);
      },
    });
    this.register();
  }

  findTab(screen) {
    return indexOf(this.appConfig.tabs, tab => tab.screen === screen, -1);
  }

  async findCurrentTab() {
    const lastScreen = await AsyncStorage.getItem('Navigator.lastScreen');
    const [tab] = lastScreen.split('/');
    return [this.findTab(tab), lastScreen];
  }

  register() {
    this.listener.register();
  }

  unregister() {
    if (this.listener) {
      this.listener.unregister();
      this.listener = null;
    }
  }
}
