var BPromise = require('bluebird');
var request = BPromise.promisifyAll(require('request'));
var utils = require('./availity.utils');

exports.hostnames = {};
exports.hostnames[utils.environments.PROD] = 'https://code.availity.com';
exports.hostnames[utils.environments.QA] = 'https://qa-code.availity.com';
exports.hostnames[utils.environments.TEST] = 'http://agltstpyg01.availity.net';

exports.apiUrl = function(path) {
  return '/api/v3/' + path;
};

var makeUrl = function(path, environment) {
  return exports.hostnames[environment] + exports.apiUrl(path);
};

exports.login = function(userId, password, environment) {
  return new BPromise(function(resolve, reject) {
    var loginData = {
      form: {
        login: userId,
        password: password
      },
      strictSSL: environment === 'qa' ? false : true
    };
    request.postAsync(makeUrl('session', environment), loginData)
    .then(function(response) {
      return response[0].body;
    })
    .then(JSON.parse)
    .then(function(json) {
      if (json['private_token']) {
        resolve(json['private_token']);
      } else {
        reject(json['message']);
      }
    })
    .catch(SyntaxError, function(err) {
      reject('Cannot interpret response: ' + err);
    })
    .catch(function(err) {
      reject('Unknown error: ' + err);
    });
  });
};

exports.uploadKey = function(token, key, environment) {
  return new BPromise(function(resolve, reject) {
    var keyData = {
      headers: {
        'PRIVATE-TOKEN': token
      },
      form: {
        title: 'availity-cli',
        key: key
      },
      strictSSL: environment === 'qa' ? false : true
    };
    request.postAsync(makeUrl('user/keys', environment), keyData)
    .then(function(response) {
      var statusCode = response[0].statusCode;
      if (statusCode === 201) {
        resolve(statusCode);
      } else if (statusCode === 404 || statusCode === 400) {
        reject('SSH key already configured');
      } else {
        reject(statusCode);
      }
    })
    .catch(function(err) {
      reject('Unknown error: ' + err);
    });
  });
};

exports.createProject = function(token, projectName, environment) {
  return new BPromise(function(resolve, reject) {
    var projectData = {
      headers: {
        'PRIVATE-TOKEN': token
      },
      form: {
        name: projectName
      },
      strictSSL: environment === 'qa' ? false : true
    };
    request.postAsync(makeUrl('projects', environment), projectData)
    .then(function(response) {
      return response[0].body;
    })
    .then(JSON.parse)
    .then(function(json) {
      if (json['ssh_url_to_repo']) {
        resolve(json['ssh_url_to_repo']);
      } else {
        var message = json['message'];
        if (message === '404 Not Found') {
          reject('You already have a project with that name on Availity');
        } else {
          reject(message);
        }
      }
    })
    .catch(SyntaxError, function(err) {
      reject('Cannot interpret response: ' + err);
    })
    .catch(function(err) {
      reject('Unknown error: ' + err);
    });
  });
};
