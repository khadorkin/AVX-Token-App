import { WEBTORRENT_ADD, WEBTORRENT_REMOVE } from 'constants/action_types';

export const addTorrent = (torrent, opts) => dispatch => {
  dispatch({
    type: WEBTORRENT_ADD,
    payload: {
      torrent,
      opts,
    },
  });
};

export const removeTorrent = torrentId => ({
  type: WEBTORRENT_REMOVE,
  payload: {
    torrentId,
  },
});
