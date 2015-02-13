var exec = require('child_process').execFileSync;
var logger = require('./logger');

var isInstalled = function(programName, url) {
  var installed = true;
  try {
    exec(programName, ['--version']);
  } catch (err) {
    installed = false;
  }
  logger.info('Checking for ' + logger.emphasisString(programName) + ' . . . ' +
              (installed ? logger.successString('OK') :
               logger.errorString('Not installed -- see ' + url + ' to install')));
  return installed;
};

exports.isHealthy = function() {
  // Check for bower
  var bower = isInstalled('bower', 'http://bower.io/');

  // Check for gulp
  var gulp = isInstalled('gulp', 'http://gulpjs.com/');

  // Check for git
  var git = isInstalled('git', 'http://git-scm.com/');

  return bower && gulp && git;
};
