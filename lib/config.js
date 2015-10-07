var _ = require('lodash');
var env = process.env.NODE_ENV || 'production';
var defaultConfig = require('config/config.default');
var envConfig = require('config/config.' + env + '.js');
module.exports = _.defaultsDeep(envConfig, defaultConfig);