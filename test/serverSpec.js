'use strict';

let prepare = require('./helper/prepare');
let It = prepare.It;

describe('buzz admin server', function () {
    It.get('/healthcheck', {}, 200, /is ok/);
});