/* eslint-disable import/no-commonjs */
const blacklist = require('metro/src/blacklist');

// defaults: https://github.com/facebook/metro/blob/v0.24.6/packages/metro/src/Config.js#L162-L189
module.exports = {
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/]);
  },
};
