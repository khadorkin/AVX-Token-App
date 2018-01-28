/* eslint-disable no-console */
import http from 'http';
import { Server as WebSocketServer } from 'ws';

import httpApiHandler from './handlers/node-http';
import webSocketApiHandler from './handlers/node-ws';

let httpServer;
let webSocketServer;

const start = () => {
  console.warn('DevServer: launch');

  httpServer = new http.Server();
  httpServer.on('close', () => process.exit(0));

  httpServer.listen(5279, 'localhost', () =>
    console.log(`Listening on ${httpServer.address().port}`)
  );
  httpServer.on('clientError', error => console.error(`DevServer.clientError: ${error}`));
  httpServer.on('connection', sock => console.error(`DevServer.connection: ${sock.remoteAddress}`));
  httpServer.on('request', httpApiHandler);
  httpServer.on('upgrade', req => console.error(`DevServer.upgrade: ${req.url}`));

  console.warn('DevServer: create socket-server');
  webSocketServer = new WebSocketServer({
    server: httpServer,
  });

  webSocketServer.on('connection', webSocketApiHandler);
};

start();
