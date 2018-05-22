import { combineReducers } from 'redux';
import {
  WEBTORRENT_ADDED,
  WEBTORRENT_REMOVE,
  WEBTORRENT_PROGRESS,
  WEBTORRENT_TORRENT,
} from 'constants/action_types';

const torrents = (state = {}, action) => {
  if (action.type === WEBTORRENT_ADDED || action.type === WEBTORRENT_TORRENT) {
    if (action.payload.infoHash) {
      return {
        ...state,
        [action.payload.infoHash]: action.payload,
      };
    }
  } else if (action.type === WEBTORRENT_REMOVE) {
    // TODO
  }
  return state;
};

const progress = (state = {}, action) => {
  if (action.type === WEBTORRENT_PROGRESS) {
    return {
      ...state,
      [action.payload.infoHash]: Object.assign({}, state[action.payload.infoHash], action.payload),
    };
  }
  return state;
};

export default combineReducers({
  torrents,
  progress,
});
