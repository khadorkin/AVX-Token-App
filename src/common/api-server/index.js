/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import jsonrpc from 'jsonrpc-lite';

const context = require.context('./routes', true, /\.js$/);
const routes = {};
context.keys().forEach(key => {
  const route = key
    .replace(/^\.\//, '')
    .replace(/\.js$/, '')
    .replace(/\//g, '_');
  const mod = context(key);
  routes[route] = mod.default || mod;
});
console.warn(['Server.routes:'].concat(Object.keys(routes)).join('\n\t'));

const handleRequest = async ({ method, params }) => {
  const endpoint = routes[method];
  if (!endpoint) {
    return jsonrpc.JsonRpcError.methodNotFound(method);
  }
  return endpoint(params);
};

const handleMessage = async message => {
  if (message.type === 'request') {
    return jsonrpc.success(message.payload.id, await handleRequest(message.payload));
  }
  return jsonrpc.error(message.payload.id, {
    message: `Type not Supported: ${message.type}`,
  });
};

export default async message => {
  console.log('api.request: ', message);
  try {
    const parsed =
      typeof message === 'string' ? jsonrpc.parse(message) : jsonrpc.parseObject(message);

    if (Array.isArray(parsed)) {
      const response = await Promise.all(parsed.forEach(handleMessage));
      console.log('api.response: ', response);
      return response;
    }
    const response = await handleMessage(parsed);
    console.log('api.response: ', response);
    return response;
  } catch (e) {
    console.error('api.error: ', e.stack || e);
    let rpcError = e;
    if (!(e instanceof jsonrpc.JsonRpcError)) {
      rpcError = jsonrpc.JsonRpcError.internalError(e);
    }
    return jsonrpc.error(message.payload.id, rpcError);
  }
};
