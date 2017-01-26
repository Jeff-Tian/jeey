'use strict';

const config = require('../config');
const mount = require('koa-mount');
const parse = require('co-body');
const proxy = require('./proxy');
const Router = require('koa-router');

const fs = require('fs');

let readFileThunk = function (src) {
    return new Promise(function (resolve, reject) {
        fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

function renderIndex() {
    return readFileThunk(__dirname + '/../client/build/index.html');
}

function * renderIndexResponse() {
    this.body = yield renderIndex();
}

function helper(app, router, render) {
    router
        .get('/:id', renderIndexResponse)
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
                data: data,
                method: 'PUT'
            });
        })
        .get('/api/jeey/:id', function*(next) {
            this.body = yield proxy({
                host: config.jeeyService.host,
                port: config.jeeyService.port,
                path: Router.url('/api/jeey/:id', {id: this.params.id}),
                method: 'GET'
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