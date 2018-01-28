/* eslint-disable import/no-commonjs */
/* eslint-disable no-console */
const webpackMain = require('electron-webpack/webpack.main.config.js');
const { inspect } = require('util');

module.exports = () =>
  webpackMain().then(config => {
    console.log(
      inspect(config, {
        showHidden: false,
        depth: null,
        colors: true,
      })
    );
    return config;
  });
