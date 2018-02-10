/* eslint-disable import/no-commonjs */
const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FlowFlowPlugin = require('./lib/flowtype-plugin');

const API_SERVER_ROOT = path.resolve(__dirname, '../src/common/api-server/');

const port = 3001;
const optimizeMode = process.env.OPTIMIZE !== undefined;

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: 'eval-source-map',
  target: 'webworker',
  node: {
    console: false,
    global: false,
    process: true,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },
  output: {
    filename: 'server/[name].js',
    chunkFilename: 'server/[name].bundle.js',
    // libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/web'),
  },
  entry: {
    worker: ['babel-polyfill', /* 'webpack/hot/poll?1000', */ './src/common/api-server/dev.worker'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/common/api-server'),
      common: path.resolve(__dirname, '../src/common'),
    },
    modules: [
      API_SERVER_ROOT,
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '..'),
    ],
    extensions: ['.js', '.json', '.node'],
  },
  // This rule is temporarily necessary until https://github.com/electron-userland/electron-webpack/issues/60 is fixed.
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
          babelrc: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BUILD_TARGET: JSON.stringify('server'),
      },
    }),
    new webpack.EnvironmentPlugin(Object.keys(process.env).filter(it => it.startsWith('WEBPACK_'))),
    new WebpackBuildNotifierPlugin({
      title: 'Webpack - dev-server',
      logo: undefined,
      sound: false,
      successSound: false,
      warningSound: false,
      failureSound: false,
      suppressSuccess: 'initial',
      suppressWarning: false,
      suppressCompileStart: true,
      activateTerminalOnError: false,
      successIcon: path.resolve(
        __dirname,
        '../node_modules/webpack-build-notifier/icons/success.png'
      ),
      warningIcon: path.resolve(
        __dirname,
        '../node_modules/webpack-build-notifier/icons/warning.png'
      ),
      failureIcon: path.resolve(
        __dirname,
        '../node_modules/webpack-build-notifier/icons/failure.png'
      ),
      compileIcon: path.resolve(
        __dirname,
        '../node_modules/webpack-build-notifier/icons/compile.png'
      ),
    }),
  ],
  devServer: {
    port,
    inline: true,
    publicPath: '/',
    hot: true,
    historyApiFallback: false,
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

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins.push(
    new FlowFlowPlugin({
      warn: true,
    })
  );
}
