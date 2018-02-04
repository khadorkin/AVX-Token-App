/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */

require('colors');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./mobile-ui.electron.config.js');

const env = process.env.ENV || 'development';
const port = process.env.PORT || 3000;
const isProduction = env === 'production';
const appRoot = path.resolve(__dirname, '../src/mobile-ui');

const plugins = [];
let useVendorChunks;

if (!isProduction) {
  if (fs.existsSync(path.resolve(__dirname, '../dist/web/vendor-manifest.json'))) {
    useVendorChunks = true;
    plugins.push(
      new webpack.DllReferencePlugin({
        context: '.',
        // eslint-disable-next-line global-require
        manifest: require('../dist/web/vendor-manifest.json'),
      })
    );
  }
}

console.log('Preparing super awesome dev-server at', ` localhost:${port} `.bgGreen, ':p');
if (!useVendorChunks)
  console.log(
    '(serving without '.grey +
      'common-library-cache'.green +
      ', run '.grey +
      'yarn vendor'.magenta +
      ' once to boost up build speed)'.grey
  );

module.exports = webpackMerge(baseConfig, {
  cache: true,
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    renderer: [path.resolve(__dirname, '../src/mobile-ui/index.js')],
  },
  output: {
    path: path.join(__dirname, '../dist/mobile-ui'),
    filename: '[name].js',
  },
  resolve: {
    modules: [appRoot, '../node_modules', 'node_modules', path.resolve(__dirname, '..')],
  },
  plugins: [
    new HtmlWebpackPlugin({
      isProduction,
      useVendorChunks,
      template: path.resolve(__dirname, '../src/mobile-ui/index.ejs'),
      filename: 'index.html',
    }),
  ].concat(plugins),
  devServer: {
    port,
    inline: true,
    open: true,
  },
});
