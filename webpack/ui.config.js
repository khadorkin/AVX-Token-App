/* eslint-disable import/no-commonjs */
const path = require('path');
const FlowFlowPlugin = require('./lib/flowtype-plugin');

const ELECTRON_RENDERER_PROCESS_ROOT = path.resolve(__dirname, '../src/ui/');

module.exports = {
  target: 'electron-renderer',
  // This rule is temporarily necessary until https://github.com/electron-userland/electron-webpack/issues/60 is fixed.
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
        },
      },
    ],
  },
  entry: {
    babelPolyfill: ['babel-polyfill'],
  },
  // This allows imports to be made from the renderer process root (https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/).
  resolve: {
    modules: [
      ELECTRON_RENDERER_PROCESS_ROOT,
      '../node_modules',
      'node_modules',
      path.resolve(__dirname, '..'),
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
};

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = [
    new FlowFlowPlugin({
      warn: true,
    }),
  ];
}
