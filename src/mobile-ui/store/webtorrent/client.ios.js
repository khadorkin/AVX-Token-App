// import WebTorrent from 'webtorrent/webtorrent.min.formatted';
// // fetch in react-native fails for webtorrent
// window.fetch

// // eslint-disable-next-line
// const WebTorrent = require('webtorrent/webtorrent.min.formatted');
// if (fetch && !window.fetch) {
//   window.fetch = fetch;
// }

// const result = new WebTorrent({
//   // maxConns: Number, // Max number of connections per torrent (default=55)
//   // nodeId: String | Buffer, // DHT protocol node ID (default=randomly generated)
//   // peerId: String | Buffer, // Wire protocol peer ID (default=randomly generated)
//   // tracker: Boolean | Object, // Enable trackers (default=true), or options object for Tracker
//   // dht: Boolean | Object, // Enable DHT (default=true), or options object for DHT
//   // webSeeds: Boolean, // Enable BEP19 web seeds (default=true)
// });

const result = {
  on() {
    return undefined;
  },
};

export default result;
