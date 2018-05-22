/* eslint-disable no-debugger */
import moment from 'moment';
import mimeTypes from 'mime-types';
import {
  WEBTORRENT_ADD,
  WEBTORRENT_ADDED,
  WEBTORRENT_REMOVE,
  WEBTORRENT_TORRENT,
  WEBTORRENT_PROGRESS,
  WEBTORRENT_COMPLETE,
  WEBTORRENT_ERROR,
} from 'constants/action_types';
import client from './client';

// Human readable bytes util
const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const prettyBytes = input => {
  let num = input;
  const neg = num < 0;
  if (neg) num = -num;
  if (num < 1) return `${(neg ? '-' : '') + num} B`;
  const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = Number((num / Math.pow(1000, exponent)).toFixed(2)); // eslint-disable-line no-restricted-properties
  const unit = units[exponent];
  return `${(neg ? '-' : '') + num} ${unit}`;
};

const getProgressInfo = torrent => {
  const { infoHash, numPeers, progress, downloaded, timeRemaining } = torrent;

  // Progress
  const normalizedProgress = Math.round(progress * 100) / 100;

  // Remaining time
  let remaining;
  if (torrent.done) {
    remaining = 'Done.';
  } else {
    remaining = moment.duration(timeRemaining / 1000, 'seconds').humanize();
    remaining = `${remaining[0].toUpperCase() + remaining.substring(1)} remaining.`;
  }

  // Speed rates
  const downloadSpeed = `${prettyBytes(torrent.downloadSpeed)}/s`;
  const uploadSpeed = `${prettyBytes(torrent.uploadSpeed)}/s`;

  return {
    infoHash,
    numPeers,
    progress: normalizedProgress,
    downloaded,
    remaining,
    downloadSpeed,
    uploadSpeed,
  };
};

const getTorrentInfo = torrent => {
  // Peers
  const { length, infoHash, magnetURI, createdBy, created, comment, files } = torrent;

  const mediaFile = files.find(({ path }) => {
    const type = mimeTypes.lookup(path);
    if (type) {
      const [generic] = type.split('/');
      return generic === 'video';
    }
    return false;
  });

  return {
    infoHash,
    length,
    magnetURI,
    createdBy,
    created,
    comment,
    mediaFile,
  };
};

export default store => {
  client.on('error', err => {
    store.dispatch({
      type: WEBTORRENT_ERROR,
      payload: err,
      error: true,
    });
  });

  client.on('torrent', torrent => {
    const onProgress = () => {
      store.dispatch({
        type: WEBTORRENT_PROGRESS,
        payload: getProgressInfo(torrent),
      });
    };
    const progressInterval = setInterval(onProgress, 500);

    const onDone = () => {
      // $body.className += ' is-seed'
      clearInterval(progressInterval);
      torrent.pause();
      store.dispatch({
        type: WEBTORRENT_COMPLETE,
        payload: getProgressInfo(torrent),
      });
    };

    // Trigger statistics refresh
    torrent.on('done', onDone);

    store.dispatch({
      type: WEBTORRENT_TORRENT,
      payload: getTorrentInfo(torrent),
    });
    onProgress();

    // const file = torrent.files.find(({ path }) => {
    //   const type = mimeTypes.lookup(path);
    //   if (type) {
    //     const [generic] = type.split('/');
    //     return generic === 'video';
    //   }
    //   return false;
    // });
    // if (file) {
    //   const selector = `#video-player-${torrent.infoHash}`;
    //   if (global.document && global.document.querySelector) {
    //     if (window.setVideoRendererFile) {
    //       window.setVideoRendererFile(file);
    //     } else {
    //       console.warn('unable to find video player', selector);
    //     }
    //   }
    // }
  });

  return next => action => {
    if (action.type === WEBTORRENT_ADD) {
      const { torrent, opts } = action.payload;
      const result = client.add(torrent, opts);
      next({
        type: WEBTORRENT_ADDED,
        payload: result,
      });
    } else if (action.type === WEBTORRENT_REMOVE) {
      const { torrentId } = action.payload;
      const torrent = client.remove(torrentId);

      // eslint-disable-next-line no-console
      torrent.on('error', console.error.bind(console));
      // eslint-disable-next-line no-console
      torrent.on('warning', console.warn.bind(console));

      debugger;
      next({
        type: WEBTORRENT_ADDED,
        payload: getTorrentInfo(torrent),
      });
    } else {
      next(action);
    }
  };
};
