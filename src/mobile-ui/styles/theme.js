import { Platform, AsyncStorage } from 'react-native';

const spacingVertical = 24;
const common = {
  card: {
    bg: 'transparent',
    hoverTranslate: '10px',
    margin: `${spacingVertical * 2 / 3}`,
    width: 220,
    maxWidth: 220, // widthPageConstrained,
    padding: `${spacingVertical * 2 / 3}`,
    radius: '2px',
    linkScaling: '1.1',
    smallWidth: `${spacingVertical * 10}px`,
  },
};
const dynamic = {
  shadow: {
    /* Shadows */
    layer: color => `0 1px 2.5px rgba(${color}, 0.18)`, // '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    focus: color =>
      `2px 4px 4px 0 rgba(${color}, 0.14), 2px 5px 3px -2px rgba(${color}, 0.2), 2px 3px 7px 0 rgba(${color}, 0.12)`,
  },
};

export const DarkTheme = {
  ...common,
  primaryColor: '#38bdea',
  backgroundColor: '#0f0f0f',
  backgroundColorRgb: '16,16,16',
  textColor: '#eaeaea',
  textColorBright: '#fafafa',
  textColorDim: '#dedede', // '#d2d2d2'
  activeBackgroundColor: '#444444',
  activeTextColor: '#fafafa',
  header: {
    backgroundColor: '#0f0f0f',
  },
  shadow: {
    layer: dynamic.shadow.layer('255,255,255'),
    focus: dynamic.shadow.focus('255,255,255'),
  },
};

export const LightTheme = {
  ...common,
  primaryColor: '#38bdea',
  backgroundColor: '#fafafa',
  backgroundColorRgb: '249,249,249',
  textColor: '#161616',
  textColorBright: '#0f0f0f',
  textColorDim: '#282828',
  activeBackgroundColor: '#e0e0e0',
  activeTextColor: '#121212',
  header: {
    backgroundColor: '#fefefe',
  },
  shadow: {
    layer: dynamic.shadow.layer('0,0,0'),
    focus: dynamic.shadow.focus('0,0,0'),
  },
};

const Theme = {
  ...(Platform.OS === 'web' ? LightTheme : DarkTheme),
  async load(setTheme) {
    let theme = setTheme;
    if (setTheme) {
      await AsyncStorage.getItem('Preferences.theme', setTheme);
    } else {
      theme = await AsyncStorage.getItem('Preferences.theme');
    }
    if (theme) {
      Object.assign(Theme, theme === 'light' ? LightTheme : DarkTheme);
    }
  },
};

export default Theme;
