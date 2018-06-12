import { Platform, AsyncStorage } from 'components/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

const commonOptions = {
  keyLength: 12, // The length of location.key
};

let history;
const platforms = {
  web: async () => {
    history = createBrowserHistory({
      ...commonOptions,
      basename: '', // The base URL of the app (see below)
      forceRefresh: false, // Set true to force full page refreshes
      // A function to use to confirm navigation with the user (see below)
      // getUserConfirmation: (message, callback) => callback(window.confirm(message)),
    });
    return history;
  },
  default: async () => {
    let initialEntry;
    try {
      initialEntry = JSON.parse(await AsyncStorage.getItem('Navigator.lastScreen'));
    } catch (e) {
      console.warn(e);
    }
    initialEntry = initialEntry || {
      pathname: '/videos',
      key: 'randomkey123',
    };
    // TODO: fix initial hack for non-root view support
    initialEntry.pathname = `/${initialEntry.pathname.split('/')[1]}`;
    // eslint-disable-next-line no-console
    console.warn('initialEntry', initialEntry.pathname);
    history = createMemoryHistory({
      ...commonOptions,
      initialEntries: [initialEntry], // The initial URLs in the history stack
      initialIndex: 0, // The starting index in the history stack
      // A function to use to confirm navigation with the user. Required
      // if you return string prompts from transition hooks (see below)
      getUserConfirmation: null,
    });
    return history;
  },
};

export const createHistory = platforms[Platform.OS] || platforms.default;

export const getHistory = () => {
  if (!history) {
    throw new Error('History was not initialized');
  }
  return history;
};
