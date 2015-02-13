var chalk = require('chalk');

var quiet = false;
var consoleLog = console.log;

var log = function(message) {
  if (!quiet) {
    console.log(message);
  }
};

module.exports = {
  mute: function() {
    console.log = function() {};
  },

  unmute: function() {
    console.log = consoleLog;
  },

  setQuiet: function(quietValue) {
    quiet = quietValue;
  },

  errorString: function(message) {
    return chalk.red(message);
  },

  warningString: function(message) {
    return chalk.yellow(message);
  },

  infoString: function(message) {
    return chalk.gray(message);
  },

  emphasisString: function(message) {
    return chalk.blue(message);
  },

  successString: function(message) {
    return chalk.green(message);
  },

  error: function(message) {
    log(this.errorString(message));
  },

  warning: function(message) {
    log(this.warningString(message));
  },

  info: function(message) {
    log(this.infoString(message));
  },

  emphasis: function(message) {
    log(this.emphasisString(message));
  },

  success: function(message) {
    log(this.successString(message));
  }
};
