export default () => {
  const worker = new Worker('server/worker.js');
  worker.onchange = () => {
    console.warn('worker.onchange');
  };
  worker.onmessage = message => {
    console.warn('worker.onmessage', message.data);
  };
  window.apiWorker = worker;
  return worker;
};
