export default () => {
  const worker = new Worker('server/worker.js');
  worker.onchange = () => {
    // eslint-disable-next-line
    console.warn('worker.onchange');
  };
  worker.onmessage = message => {
    // eslint-disable-next-line
    console.warn('worker.onmessage', message.data);
  };
  window.apiWorker = worker;
  return worker;
};
