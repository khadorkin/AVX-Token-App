/* eslint-disable import/no-commonjs */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ReloadServerPlugin = require('reload-server-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FlowFlowPlugin = require('./lib/flowtype-plugin');

const API_SERVER_ROOT = path.resolve(__dirname, '../src/common/api-server/');

module.exports = {
  context: path.resolve(__dirname, '..'),
  devtool: 'eval-source-map',
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: true,
    __dirname: true,
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../node_modules'),
      whitelist: ['webpack/hot/poll?1000', 'babel-polyfill'],
    }),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/server'),
  },
  entry: {
    index: ['babel-polyfill', /* 'webpack/hot/poll?1000', */ './src/common/api-server/dev.node'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/electron'),
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
        },
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve(__dirname, '../dist/server/index.js'),
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __static: `"${path.resolve(__dirname, '../static')}"`,
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
      // onClick: [Function],
      // messageFormatter: [Function],
    }),
    // WatchFilterPlugin {
    //   filter: [Function],
    //   debug:
    //    { [Function: debug]
    //      namespace: 'webpack:watch-server-dev',
    //      enabled: false,
    //      useColors: true,
    //      color: 69,
    //      destroy: [Function: destroy],
    //      inspectOpts: {} } },
  ],
};

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins.push(
    new FlowFlowPlugin({
      warn: true,
    })
  );
}
