import '@babel/polyfill';
import React from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom';
import { AppRegistry, AsyncStorage } from 'react-native'; // eslint-disable-line
import 'styles';
import Theme from 'theme';

import { createStore } from './store';
import { createHistory } from './store/history';

import webWorker from './api/webworker';

window.__ = t => t; // eslint-disable-line
if (process.env.API_SERVER.indexOf('webworker') === 0) {
  webWorker(process.env.API_SERVER.slice(10));
}

window.ReactNative = {
  findNodeHandle: ReactDOM.findDOMNode,
};

const start = async () => {
  const [history] = await Promise.all([createHistory(), Theme.load()]);
  createStore(history);

  // eslint-disable-next-line global-require
  AppRegistry.registerComponent('avxtokenapp', () => require('./core/web').default);

  AppRegistry.runApplication('avxtokenapp', {
    initialProps: {},
    rootTag: document.getElementById('avxtokenapp'),
  });
};
start();
