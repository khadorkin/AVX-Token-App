/* eslint-disable import/no-commonjs */
/* eslint-disable global-require */

process.env.API_SERVER = 'webworker';

module.exports = [require('./mobile-ui.config'), require('./server.config.webworker')];
