var path = require('path');
var fs = require('fs');
var keytar = require('keytar');

var UserConfiguration = function() {
  var homeDirectory = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
  this.fileName = path.join(homeDirectory, '.availity.config.json');
  this.config = {}; // the contents of the JSON configuration file
  this.tokens = {}; // the tokens, which are store in the keychain/keyring/vault
  this._load();
};

var proto = UserConfiguration.prototype;

proto._getEnvironment = function(environment) {
  for (var i = 0, n = this.config.environments.length; i < n; i++) {
    if (this.config.environments[i].name === environment) {
      return this.config.environments[i];
    }
  }
  var env = { name: environment };
  this.config.environments.push(env);
  return env;
};

proto._getToken = function(environment, userId) {
  return keytar.getPassword('availity-cli:' + environment, userId);
};

proto._setToken = function(environment, userId, token) {
  keytar.addPassword('availity-cli:' + environment, userId, token);
};

proto._load = function() {
  try {
    // Load the JSON file
    this.config = JSON.parse(fs.readFileSync(this.fileName, { encoding: 'utf8' }));

    // Load any tokens
    for (var i = 0, n = this.config.environments.length; i < n; i++) {
      var env = this.config.environments[i];
      var token = this._getToken(env.name, env.userId);
      if (token) {
        this.tokens[env.name] = token;
      }
    }
  } catch (err) {
    // Ignore file not found error
    if (err.code !== 'ENOENT') {
      throw err;
    }
  }
  // Make sure we have something
  this.config = this.config || {};
  this.config.environments = this.config.environments || [];
};

proto._save = function() {
  // Save the JSON file
  fs.writeFileSync(this.fileName, JSON.stringify(this.config, null, 2));

  // Save any tokens
  if (this.config.environments) {
    for (var i = 0, n = this.config.environments.length; i < n; i++) {
      var env = this.config.environments[i];
      if (env.name && env.userId && this.tokens[env.name]) {
        this._setToken(env.name, env.userId, this.tokens[env.name]);
      }
    }
  }
};

proto.getValue = function(key, environment) {
  if (environment) {
    return this._getEnvironment(environment)[key];
  } else {
    return this.config[key];
  }
};

proto.setValue = function(key, value, environment) {
  if (environment) {
    this._getEnvironment(environment)[key] = value;
  } else {
    this.config[key] = value;
  }
  this._save();
};

proto.getCredentials = function(environment) {
  var env = this._getEnvironment(environment);
  return this.tokens[env.name];
};

proto.setCredentials = function(userId, token, environment) {
  // The call to setValue will automatically call save
  this.tokens[environment] = token;
  this.setValue('userId', userId, environment);
};

module.exports = new UserConfiguration();
