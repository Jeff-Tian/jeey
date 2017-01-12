'use strict';

const config = require('../config');
const mount = require('koa-mount');

const fs = require('fs');

function helper(app, router, render) {
    router
        .get('/healthcheck', function *(next) {
            this.body = {everything: 'is ok', time: new Date(), nev: '' + process.env.NODE_ENV};
        })
    ;
}

function api(app, router) {
}

module.exports = function (app, router, render) {
    helper(app, router, render);
    api(app, router);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};