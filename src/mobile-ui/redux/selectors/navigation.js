import { createSelector } from 'reselect';
import { parseQueryParams, toQueryString } from 'utils/query_params';
import { normalizeURI } from 'utils/lbryURI';

export const selectState = state => state.navigation || {};
export const selectLocation = function(state) {
  return state.router.location;
};

export const selectCurrentPath = createSelector(
  selectLocation,
  location => location.path + location.search + location.href
);

export const computePageFromPath = (path = '') => path.replace(/^\//, '').split('?')[0];

export const selectCurrentPage = createSelector(selectCurrentPath, path =>
  computePageFromPath(path)
);

export const selectCurrentParams = createSelector(selectLocation, ({ search, hash }) => {
  if (search === undefined) return {};
  if (!search.match(/\?/)) return {};

  return parseQueryParams(search.slice(1) + hash);
});

export const makeSelectCurrentParam = param =>
  createSelector(selectCurrentParams, params => (params ? params[param] : undefined));

export const selectHeaderLinks = createSelector(selectCurrentPage, page => {
  // This contains intentional fall throughs
  switch (page) {
    case 'wallet':
    case 'history':
    case 'send':
    case 'getcredits':
    case 'invite':
    case 'rewards':
    case 'backup':
      return {
        wallet: __('Overview'),
        getcredits: __('Get Credits'),
        send: __('Send / Receive'),
        rewards: __('Rewards'),
        invite: __('Invites'),
        history: __('History'),
      };
    case 'downloaded':
    case 'published':
      return {
        downloaded: __('Downloaded'),
        published: __('Published'),
      };
    case 'settings':
    case 'help':
      return {
        settings: __('Settings'),
        help: __('Help'),
      };
    case 'discover':
    case 'subscriptions':
      return {
        discover: __('Discover'),
        subscriptions: __('Subscriptions'),
      };
    default:
      return null;
  }
});

export const selectPageTitle = createSelector(
  selectCurrentPage,
  selectCurrentParams,
  (page, params) => {
    switch (page) {
      case 'settings':
        return __('Settings');
      case 'report':
        return __('Report');
      case 'wallet':
        return __('Wallet');
      case 'send':
        return __('Send or Receive LBRY Credits');
      case 'getcredits':
        return __('Get LBRY Credits');
      case 'backup':
        return __('Backup Your Wallet');
      case 'rewards':
        return __('Rewards');
      case 'invite':
        return __('Invites');
      case 'start':
        return __('Start');
      case 'publish':
        return params.id ? __('Edit') : __('Publish');
      case 'help':
        return __('Help');
      case 'developer':
        return __('Developer');
      case 'show': {
        const parts = [normalizeURI(params.uri)];
        // If the params has any keys other than "uri"
        if (Object.keys(params).length > 1) {
          parts.push(toQueryString(Object.assign({}, params, { uri: null })));
        }
        return parts.join('?');
      }
      case 'downloaded':
        return __('Downloads & Purchases');
      case 'published':
        return __('Publications');
      case 'search':
        return params.query ? __('Search results for %s', params.query) : __('Search');
      case 'subscriptions':
        return __('Your Subscriptions');
      case 'discover':
      case false:
      case null:
      case '':
        return '';
      default:
        return page[0].toUpperCase() + (page.length > 0 ? page.substr(1) : '');
    }
  }
);

export const selectPathAfterAuth = createSelector(selectState, state => state.pathAfterAuth);

export const selectIsBackDisabled = createSelector(selectState, state => state.index === 0);

export const selectIsForwardDisabled = createSelector(
  selectState,
  state => state.index === state.stack.length - 1
);

export const selectHistoryIndex = createSelector(selectState, state => state.index);

export const selectHistoryStack = createSelector(selectState, state => state.stack);

// returns current page attributes (scrollY, path)
export const selectActiveHistoryEntry = createSelector(
  selectState,
  state => state.stack[state.index]
);
