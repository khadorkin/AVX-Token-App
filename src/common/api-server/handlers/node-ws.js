/* eslint-disable no-console */
import url from 'url';
import apiServer from '../index';

export default (ws, req) => {
  const location = url.parse(req.url, true);

  console.warn(`Daemon.ws: connect ${location.pathname}`);
  ws.on('error', error => console.error(`Daemon.ws.error: ${error}`));
  ws.on('close', (code, reason) => console.error(`Daemon.ws.cose: ${code} ${reason}`));

  ws.on('message', async message => {
    try {
      const body = typeof message === 'string' ? JSON.parse(message) : message;

      const response = await apiServer(body);
      ws.send(JSON.stringify(response));
    } catch (e) {
      console.error(e.stack || e);
      ws.send(JSON.stringify(e));
    }
  });
  // apiServer(ws);
};
