#!/usr/bin/env node
require('babel-core/register');
const Express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const api = require('./api/index');
const config = require('./config/index');

const app = new Express();

app.use('/api', api);
app.use(history());
config.development && app.use(require('./webpack/devServer'));
app.use(Express.static(path.join('static')));

const server = app.listen(config.port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});
