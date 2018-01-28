/* eslint-disable no-console */

// eslint-disable-next-line import/extensions
import jsonrpcLite from 'jsonrpc-lite';

export default class WSTransport {
  static STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
  };

  ws;
  handlers;
  pending;
  id;

  constructor(uri, secure) {
    this.id = 0;
    this.handlers = [];
    this.pending = [];
    this.ws = new WebSocket(`${secure ? 'wss' : 'ws'}://${uri}`);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.error = this.error.bind(this);
    this.message = this.message.bind(this);
    this.ws.addEventListener('open', this.open);
    this.ws.addEventListener('close', this.close);
    this.ws.addEventListener('error', this.error);
    this.ws.addEventListener('message', this.message);
  }

  get isConnected() {
    return this.ws.readyState === WSTransport.STATE.OPEN;
  }

  call(method, params) {
    const call = new Promise((resolve, reject) => {
      const exec = async () => {
        this.id += 1;
        const { id } = this;
        const req = jsonrpcLite.request(id.toString(), method, params);
        this.handlers[id] = {
          resolve: result => {
            delete this.handlers[id];
            resolve(result);
          },
          reject: error => {
            delete this.handlers[id];
            reject(error);
          },
        };
        console.warn(`api.${id}`, method);
        this.ws.send(JSON.stringify(req));
        return call;
      };
      if (this.ws.readyState === WSTransport.STATE.OPEN) {
        exec();
      } else {
        this.pending.push(exec);
      }
    });
    return call;
  }

  async open(ev) {
    console.warn(this && 'ws.Open', ev);
    for (let pending = this.pending.shift(); pending; pending = this.pending.shift()) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await pending();
      } catch (_) {
        // skip
      }
    }
  }

  close(ev) {
    console.warn(this && 'ws.Close', ev);
  }

  error(error) {
    console.warn(this && 'ws.Error', error);
  }

  message(message) {
    const data = JSON.parse(message.data);
    console.warn(this && 'ws.Message', data);
    const handler = this.handlers[data.id];
    if (handler) {
      if (data.result) {
        handler.resolve(data.result);
      } else {
        handler.reject(data.error);
      }
    }
  }
}
