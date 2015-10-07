var _ = require('lodash');
var path = require('path');
var env = process.env.NODE_ENV || 'production';
var configPath = process.env.NODE_CONFIG_PATH;
if (!configPath){
    configPath = path.resolve(__dirname).split('/node_modules')[0];
}
var defaultConfig = require(configPath + '/config/config.default');
var envConfig = require(configPath + '/config/config.' + env + '.js');
module.exports = _.defaultsDeep(envConfig, defaultConfig);