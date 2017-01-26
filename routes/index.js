'use strict';

const config = require('../config');
const mount = require('koa-mount');
const parse = require('co-body');
const proxy = require('./proxy');

const fs = require('fs');

function helper(app, router, render) {
    router
        .get('/healthcheck', function *(next) {
            this.body = {everything: 'is ok', time: new Date(), nev: '' + process.env.NODE_ENV};
        })
    ;
}

function api(app, router, render) {
    router
        .put('/api/jeey', function*(next) {
            let data = yield parse(this.request);

            this.body = yield proxy({
                host: config.jeeyService.host,
                port: config.jeeyService.port,
                path: '/api/jeey',
                data: data
            });
        })
    ;
}

module.exports = function (app, router, render) {
    helper(app, router, render);
    api(app, router, render);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};