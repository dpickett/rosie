'use strict';
const config = require('../lib/config');
const server = require('../lib/server/main');
const _debug = require('debug');

const debug = _debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port);
debug("Server is now running at http://" + host + ":" + port + ".");
