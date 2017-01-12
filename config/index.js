'use strict';

const util = require('util');

var config = {
    version: '1.0.0-' + Date.now()
};

var configPath = util.format('./config_%s.js', (process.env.NODE_ENV || 'dev'));

if (process.env.NODE_ENV === 'development') {
    configPath = util.format('./config_%s.js', 'dev');
}

if (process.env.NODE_ENV === 'production') {
    configPath = util.format('./config_%s.js', 'prd');
}

var envConfig = require(configPath);

config = Object.assign(config, envConfig);

if (process.env.DATACENTER) {
    config.captcha.public.host = process.env.DATACENTER + '-' + config.captcha.public.host;
}

config.serviceUrls = require('./serviceUrls');

module.exports = config;