/* eslint-disable no-console */
import http from 'http';
import { Server as WebSocketServer } from 'ws';

export default class Server {
  httpServer;
  webSocketServer;
  handlers;

  constructor() {
    this.handlers = [];
  }

  launch() {
    if (process.env.ELECTRON_WEBPACK_MAIN_SERVER === 'false') {
      console.warn('Daemon: disabled by environment ELECTRON_WEBPACK_MAIN_SERVER');
      return;
    }
    const httpApiHandler = require('../common/api-server/handlers/node-http').default; // eslint-disable-line global-require
    const webSocketApiHandler = require('../common/api-server/handlers/node-ws').default; // eslint-disable-line global-require
    console.warn('Daemon: launch');

    this.httpServer = new http.Server();
    this.httpServer.on('close', () => this.fire('exit'));
    this.httpServer.on('clientError', error => console.error(`Daemon.clientError: ${error}`));
    this.httpServer.on('connection', sock =>
      console.error(`Daemon.connection: ${sock.remoteAddress}`)
    );
    this.httpServer.on('request', httpApiHandler);
    this.httpServer.on('upgrade', req => console.error(`Daemon.upgrade: ${req.url}`));

    this.httpServer.listen(5279, 'localhost', () =>
      console.log(`Listening on ${this.httpServer.address().port}`)
    );

    console.warn('Daemon: create socket-server');
    this.webSocketServer = new WebSocketServer({
      server: this.httpServer,
    });

    this.webSocketServer.on('connection', webSocketApiHandler);
  }

  quit() {
    if (this.httpServer) {
      this.httpServer.close();
    } else {
      this.fire('exit');
    }
  }

  // Follows the publish/subscribe pattern

  // Subscribe method
  on(event, handler, context = handler) {
    console.log('Daemon.on: ', event);
    this.handlers.push({ event, handler: handler.bind(context) });
  }

  // Publish method
  fire(event, args) {
    console.log('Daemon.fire: ', event);
    this.handlers.forEach(topic => {
      if (topic.event === event) topic.handler(args);
    });
  }
}

if (module.hot) {
  module.hot.accept('./Server.js', () => {});
}
