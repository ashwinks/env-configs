# env-configs

Introduction
------------

This module is a VERY lightweight Node hierarchial configuration loader. I apologize for the less than ideal name - finding an available NPM modules name is like trying to find an available gmail address. You create a set of configuration files, one per environment and this module will do the rest. You do not need to copy the entire schema for every config file, it will merge and override. Your environment specific config files should only contain attributes to be overriden in the default config. 

Installation
------------
`npm install env-configs`

Usage
-----
First, you will need to create your configuration files. Create a folder named `config` in your projects root direction OR specify its location using the `NODE_CONFIG_PATH` environment variable. 
This module includes a config directory you can copy and modify as needed.
Config files are loaded depending on the `NODE_ENV` environment variable and defaults to `production`. The `config.default.js` file should contain your full configuration schema for your production environment. 
This file will be loaded by default, then your environment specific config file will be loaded *overriding* attributes in the default config file. Environment configration files need to follow the `config.{environment_name}.js` naming convention. 

So for instance, if you need different database settings for your local environment, you would create a `config.local.js` file and override the db settings. Please see the config files in this module for an example.

`
var config = require('env-configs');
console.log(config.database.host);
`


