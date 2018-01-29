/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */

const path = require('path');
const webpack = require('webpack');
require('colors');

console.log('Building common chunks... Grab a cup of coffee while this is running ;)'.bgMagenta);

const devVendors =
  process.env.NODE_ENV !== 'production' ? ['sockjs-client', 'url', 'strip-ansi', 'ansi-regex'] : [];

module.exports = {
  devtool: 'eval-source-map',

  target: 'web',

  entry: {
    vendor: [
      'babel-polyfill',
      ...devVendors,
      'classnames',
      'formik',
      'jshashes',
      'jsonrpc-lite',
      'moment',
      'qrcode.react',
      'react',
      'react-dom',
      'react-markdown',
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

  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    modules: ['node_modules'],
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.(png|jpg|svg|ttf)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
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
};
