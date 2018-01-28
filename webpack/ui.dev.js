/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackRenderer = require('electron-webpack/webpack.renderer.config.js');
const { inspect } = require('util');

module.exports = () =>
  webpackRenderer().then(config => {
    config.externals = [];
    delete config.entry.babelPolyfill;
    const finalConfig = webpackMerge(config, {
      target: 'web',
      devServer: {
        port: 3000,
      },
      resolve: {
        aliasFields: ['browser'],
        alias: {
          fs: path.resolve(__dirname, 'stub.js'),
        },
      },
    });
    console.log(
      inspect(finalConfig, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    );
    return finalConfig;
  });
