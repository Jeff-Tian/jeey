'use strict';

const koa = require('koa');
const app = module.exports = koa();
const config = require('./config');
const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const logger = require('koa-logger');
const views = require('co-views');
const serveStatic = require('koa-static');

const render = views(path.join(__dirname, 'views'), {
    default: "pug",
    extension: "pug"
});

app.use(logger());

require('./routes')(app, router, render);

if (['producation', 'prd', 'uat', 'qa'].indexOf(process.env.NODE_ENV) >= 0) {
    app.use(serveStatic('client/build'));
}

if (!module.parent) {
    var port = process.env.PORT || config.port || 11111;
    app.listen(port);
    console.log('Running %s site at: http://localhost:%d', config.mode, port);
}