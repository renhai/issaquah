#!/usr/bin/env node
require('babel-core/register');
const Express = require('express');
const proxy = require('express-http-proxy');
const url = require('url');
const history = require('connect-history-api-fallback');
const path = require('path');
const api = require('./api/index');
const config = require('./config/index');

const app = new Express();
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use('/api', api);
app.use(history());
config.api && app.use(proxy(`${config.api.host}:${config.api.port}`, {
  filter: req => {
    const path = url.parse(req.url).path;
    return path.indexOf('/api') === 0;
  }
}));
config.development && app.use(require('./webpack/devServer'));
app.use(Express.static(path.join('static')));

const server = app.listen(config.port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('server listening at http://%s:%s', host, port);
});
