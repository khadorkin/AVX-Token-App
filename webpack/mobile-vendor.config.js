/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */

require('colors');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = Object.assign({}, require('./mobile-ui.electron.config.js'));

delete baseConfig.entry;

console.log('Building common chunks... Grab a cup of coffee while this is running ;)'.bgMagenta);

const devVendors =
  process.env.NODE_ENV !== 'production' ? ['sockjs-client', 'url', 'strip-ansi', 'ansi-regex'] : [];

module.exports = webpackMerge(baseConfig, {
  devtool: 'eval-source-map',

  target: 'web',

  entry: {
    vendor: [
      '@babel/polyfill',
      ...devVendors,
      'classnames',
      'formik',
      'jshashes',
      'jsonrpc-lite',
      'moment',
      'qrcode.react',
      'react',
      'react-dom',
      'react-paginate',
      'react-simplemde-editor',
      'react-native-web',
      'react-redux',
      'redux',
      'redux-action-buffer',
      'redux-logger',
      'redux-persist',
      'redux-persist-transform-compress',
      'redux-persist-transform-filter',
      'redux-thunk',
      'reselect',
    ],
  },

  output: {
    filename: '[name].cache.js',
    path: path.join(__dirname, '../dist/web'),
    library: '[name]_lib',
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist/web/[name]-manifest.json'),
      name: '[name]_lib',
    }),
  ],
});
