/* eslint-disable no-console */
import apiServer from '../index';

export default workerGlobal => {
  console.warn(`Daemon.worker: connected`);
  workerGlobal.addEventListener('error', error => console.error(`Daemon.worker.error: ${error}`));

  workerGlobal.addEventListener('message', async message => {
    try {
      const body = typeof message === 'string' ? JSON.parse(message) : message;

      const response = await apiServer(body);
      workerGlobal.postMessage(JSON.stringify(response));
    } catch (e) {
      console.error(e.stack || e);
      workerGlobal.postMessage(JSON.stringify(e));
    }
  });
};
