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
const plugins = [];

if (!isProduction) {
  plugins.push(
    new FlowFlowPlugin({
      warn: true,
    })
  );
}

const srcRoot = path.resolve(__dirname, '../src/mobile-ui');

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
      'react-router-native': 'react-router-dom',
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
          plugins: [
            'react-hot-loader/babel',
            [
              'module-resolver',
              {
                root: ['./src/mobile-ui'],
                alias: {
                  components: path.join(srcRoot, 'components'),
                  constants: path.join(srcRoot, 'constants'),
                  styles: path.join(srcRoot, 'styles'),
                  'redux/actions': path.join(srcRoot, 'redux/actions'),
                  'redux/reducers': path.join(srcRoot, 'redux/reducers'),
                  'redux/selectors': path.join(srcRoot, 'redux/selectors'),
                  types: path.join(srcRoot, 'types'),
                  utils: path.join(srcRoot, 'utils'),
                },
                extensions: ['.js'],
              },
            ],
          ],
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
    new webpack.DefinePlugin({
      'process.env.BROWSER': 'true',
      'process.env.API_SERVER': `'${process.env.API_SERVER || 'ws://localhost:5279'}'`,
    }),
  ].concat(plugins),
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
