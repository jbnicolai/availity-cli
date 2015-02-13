var logger = require('../lib/logger');

describe('strings', function() {
  it('should return message when error', function() {
    logger.errorString('test').should.match(/test/);
  });
  it('should return message when warning', function() {
    logger.warningString('test').should.match(/test/);
  });
  it('should return message when info', function() {
    logger.infoString('test').should.match(/test/);
  });
  it('should return message when emphasis', function() {
    logger.emphasisString('test').should.match(/test/);
  });
  it('should return message when success', function() {
    logger.successString('test').should.match(/test/);
  });
});

describe('mute', function() {
  it('should alter console.log when muted and unmuted', function() {
    // Set to default state
    logger.unmute();
    var consoleLog = console.log.toString();
    logger.mute();
    console.log.toString().should.not.equal(consoleLog);
    logger.unmute();
    console.log.toString().should.equal(consoleLog);
  });
});
