var BPromise = require('bluebird');

exports.projectConfigurationFile = 'availity.config.json';

var prompt = BPromise.promisifyAll(require('prompt'));
prompt.message = '';
prompt.delimiter = '';
prompt.colors = false;
exports.prompt = prompt;

exports.environments = {
  TEST: 'test',
  QA: 'qa',
  PROD: 'prod'
};

exports.environmentNames = Object.keys(exports.environments).map(function(key) {
  return exports.environments[key];
});
