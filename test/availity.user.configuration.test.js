var path = require('path');
var FS = require('fs-mock');
var rewire = require('rewire');
var userConfiguration = rewire('../lib/availity.user.configuration');

var homeDirectory = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var properties = {};
properties[path.join(homeDirectory, '.availity.config.json')] = JSON.stringify({
  'environments': [
    {
      'name': 'test',
      'userId': 'testUserId'
    },
    {
      'name': 'qa',
      'userId': 'qaUserId'
    },
    {
      'name': 'prod',
      'userId': 'prodUserId'
    }
  ]
});
userConfiguration.__set__('fs', new FS(properties));
userConfiguration._load(); // Now that we've mocked the fs, reload

describe('user configuration', function() {
  it('should have 3 environments', function() {
    userConfiguration.getValue('environments').length.should.equal(3);
  });

  it('should have user ID for test', function() {
    userConfiguration.getValue('userId', 'test').should.equal('testUserId');
  });

  it('should have user ID for qa', function() {
    userConfiguration.getValue('userId', 'qa').should.equal('qaUserId');
  });

  it('should have user ID for prod', function() {
    userConfiguration.getValue('userId', 'prod').should.equal('prodUserId');
  });

  it('should set a top-level setValue', function() {
    userConfiguration.setValue('foo', 'bar');
    userConfiguration.getValue('foo').should.equals('bar');
  });

  it('should set an environmental setValue', function() {
    userConfiguration.setValue('userId', 'newUserId', 'test');
    userConfiguration.getValue('userId', 'test').should.equal('newUserId');
  });

  it('should store token', function() {
    userConfiguration.setCredentials('my_user_id', 'my_token', 'test');
    var keytar = require('keytar');
    keytar.getPassword('availity-cli:test', 'my_user_id').should.equal('my_token');
    keytar.deletePassword('availity-cli', 'my_user_id');
  });
});
