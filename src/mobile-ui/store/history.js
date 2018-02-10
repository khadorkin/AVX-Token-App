import { Platform } from 'components/core';
import { createBrowserHistory, createMemoryHistory } from 'history';

const commonOptions = {
  keyLength: 12, // The length of location.key
};

const platforms = {
  web: () =>
    createBrowserHistory({
      ...commonOptions,
      basename: '', // The base URL of the app (see below)
      forceRefresh: false, // Set true to force full page refreshes
      // A function to use to confirm navigation with the user (see below)
      // getUserConfirmation: (message, callback) => callback(window.confirm(message)),
    }),
  default: () =>
    createMemoryHistory({
      ...commonOptions,
      initialEntries: ['/'], // The initial URLs in the history stack
      initialIndex: 0, // The starting index in the history stack
      // A function to use to confirm navigation with the user. Required
      // if you return string prompts from transition hooks (see below)
      getUserConfirmation: null,
    }),
};

const history = (platforms[Platform.OS] || platforms.default)();

export default history;
