var healthCheck = require('../lib/health.check');

describe('health check', function() {
  this.timeout(10000); // Allow the CLIs to run to completion

  it('should be healthy', function() {
    healthCheck.isHealthy().should.be.ok;
  });
});
