/* eslint-disable no-console */
import webSocketApiHandler from './handlers/web-worker';

const start = () => {
  console.warn('DevServer: launch');
  webSocketApiHandler(global);
};

start();
