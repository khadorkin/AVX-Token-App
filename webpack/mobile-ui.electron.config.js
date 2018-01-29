/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */

require('colors');
const path = require('path');
const webpack = require('webpack');
const FlowFlowPlugin = require('./lib/flowtype-plugin');

const env = process.env.ENV || 'development';
const optimizeMode = process.env.OPTIMIZE !== undefined;
const publicPath = '/';
const isProduction = env === 'production';
let flowTypePlugin = null;

if (!isProduction) {
  flowTypePlugin = new FlowFlowPlugin({
    warn: true,
  });
}

module.exports = {
  cache: true,
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  output: {
    publicPath,
  },
  resolve: {
    alias: {
      'react-hot-loader-patch': isProduction
        ? path.resolve(__dirname, 'lib/stub')
        : path.resolve(__dirname, '../node_modules/react-hot-loader/patch'),
      'react-hot-loader-app-container': isProduction
        ? path.resolve(__dirname, '../node_modules/react-hot-loader/lib/AppContainer.prod')
        : path.resolve(__dirname, '../node_modules/react-hot-loader/lib/AppContainer.dev'),
      'react-native': 'react-native-web',
    },
    extensions: ['.js', '.jsx', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules|packages/, // <- comment this if you want hot-reload node_modules
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
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
  plugins: [
    new webpack.NamedModulesPlugin(),
    flowTypePlugin,
    new webpack.DefinePlugin({
      'process.env.BROWSER': 'true',
    }),
  ],
  devServer: {
    publicPath,
    contentBase: [path.resolve(__dirname, '../dist/web'), path.resolve(__dirname, '../static')],
    hot: true,
    historyApiFallback: true,
    stats: {
      /* https://webpack.js.org/configuration/stats/#stats */
      colors: true,
      version: true,
      hash: optimizeMode,
      timings: true,
      performance: optimizeMode,
      modules: optimizeMode,
      moduleTrace: optimizeMode,
      modulesSort: 'size',
      chunkModules: optimizeMode,
      chunkOrigins: optimizeMode,
      cached: true,
      error: true,
      cachedAssets: optimizeMode,
      overlay: false,
    },
  },
};
