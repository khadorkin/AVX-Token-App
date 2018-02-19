/* eslint-disable import/no-commonjs */
const path = require('path');

const ELECTRON_MAIN_PROCESS_ROOT = path.resolve(__dirname, '../src/electron/');

module.exports = {
  // This allows imports to be made from the renderer process root (https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/).
  resolve: {
    modules: [ELECTRON_MAIN_PROCESS_ROOT, 'node_modules', path.resolve(__dirname, '..')],
    extensions: ['.js', '.jsx', '.css'],
  },
};
