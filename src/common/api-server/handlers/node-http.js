/* eslint-disable no-console */
import url from 'url';
import apiServer from '../index';

const responseHeaders = {
  'Content-Type': 'applicatoin/json',
};

const readHttpBody = req =>
  new Promise((resolve, reject) => {
    let buf = Buffer.from('');
    req.on('data', chunk => {
      buf += chunk;
    });
    req.on('error', reject);
    req.on('end', () => {
      try {
        resolve(buf.toString('utf8'));
      } catch (e) {
        reject(e);
      }
    });
  });

export default async (req, res) => {
  const location = url.parse(req.url, true);
  try {
    if (location !== '/') {
      res.writeHead(400, 'Not Found', responseHeaders);
      return res.end(JSON.stringify({ message: 'Not Found' }));
    } else if (req.method !== 'POST') {
      res.writeHead(405, 'Method Not Allowed', responseHeaders);
      return res.end(JSON.stringify({ message: 'Method Not Allowed' }));
    }
    const body = JSON.parse(await readHttpBody(req));

    const response = await apiServer(body);
    res.writeHead(200, responseHeaders);
    return res.end(JSON.stringify(response));
  } catch (e) {
    console.error(e.stack || e);
    res.writeHead(500, responseHeaders);
    return res.end(JSON.stringify(e));
  }
};
