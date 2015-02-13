var utils = require('../lib/availity.utils.js');

describe('utils', function() {
  it('should have a project configuration file', function() {
    utils.projectConfigurationFile.should.not.be.null;
    utils.projectConfigurationFile.should.have.length.above(0);
  });

  it('should have a project configuration file with a relative path', function() {
    utils.projectConfigurationFile.charAt(0).should.not.equal('/');
  });

  it('should have 3 environments', function() {
    Object.keys(utils.environments).length.should.equal(3);
  });

  it('should have 3 names for environments', function() {
    utils.environmentNames.length.should.equal(3);
  });
});
