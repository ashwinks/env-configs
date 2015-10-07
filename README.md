# env-configs

Introduction
------------

This module is a VERY lightweight node environment dependent configuration loader. I apologize for the less than ideal name - finding an available NPM modules name is like trying to find an available gmail address. You create a set of configuration files, one per environment and this module will do the rest. You do not need to copy the entire schema for every config file, it will merge and override. Your environment specific config files should only contain attributes to be overriden in the default config. 

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
```
var config = require('env-configs');
console.log(config.database.host);
```

If you forget to create a config file, node will throw a `module not found` fatal error - easy peasy.

How it works
------------
I've seen many configuration modules do a bunch of fancy file loading, parsing, merging etc. I believe it's all unnecssary because we an leverage nodes own module architecture to solve this problem elegantly. 

Lets first try to determine what environment we're in:
```
var env = process.env.NODE_ENV || 'production';
```

Next, determine where are config files are:
```var configPath = process.env.NODE_CONFIG_PATH;
if (!configPath){
    configPath = path.resolve(__dirname).split('/node_modules')[0];
}
```

We will first check to see if there's an envirionment variable `NODE_CONFIG_PATH`, if not, get the projects root path.

Next, load the default config:
```
var defaultConfig = require(configPath + '/config/config.default');
```

Then load the envirionment config:
```
var envConfig = require(configPath + '/config/config.' + env + '.js');
```

Override the default properties in our default config with the env specific config:
```
module.exports = _.defaultsDeep(envConfig, defaultConfig);
```

What we're doing here is using the `defaultsDeep` lodash method (https://lodash.com/docs#defaults) which esentially replaces source `defaultConfig` object properties with those in `envConfig`

That's it. Enough to solve most of our configuration issues.

License
-------
MIT