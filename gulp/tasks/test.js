var gulp = require('gulp');
var mocha = require('gulp-mocha');
var hollywood = require('mocha-hollywood-reporter');
var logger = require('../../lib/logger');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

logger.mute();

gulp.task('test', function() {
  var config = require('../config').test;
  gulp.src(config.src)
    .pipe(mocha({ reporter: hollywood }));
});
