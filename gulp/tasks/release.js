var gulp = require('gulp');

var bumpType;

gulp.task('release:sequence', function() {
  var runSequence = require('run-sequence').use(gulp);
  runSequence(
    'lint',
    'release:bump',
    'readme',
    'release:tag'
  );
});

gulp.task('release:bump', function() {
  var bump = require('gulp-bump');
  return gulp.src('./package.json')
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('release:tag', function() {
  var git = require('gulp-git');
  var tagVersion = require('gulp-tag-version');
  var filter = require('gulp-filter');

  return gulp.src(['./package.json', 'README.md'])
    .pipe(git.commit('bump package version'))
    .pipe(filter('package.json'))
    .pipe(tagVersion());
});

gulp.task('release', function() {
  var prompt = require('gulp-prompt');
  var semver = require('semver');
  var pkg = require('../../package.json');

  return gulp.src('')
    .pipe(prompt.prompt({
      type: 'rawlist',
      name: 'bump',
      message: 'What type of version bump (current version: ' + pkg.version + ')?',
      choices: [
        'patch (' + pkg.version + ' --> ' + semver.inc(pkg.version, 'patch') + ')',
        'minor (' + pkg.version + ' --> ' + semver.inc(pkg.version, 'minor') + ')',
        'major (' + pkg.version + ' --> ' + semver.inc(pkg.version, 'major') + ')',
        'none (exit)'
      ]
    }, function(response) {
      var res = response.bump;
      if (res.match(/^patch/)) {
        bumpType = 'patch';
      } else if (res.match(/^minor/)) {
        bumpType = 'minor';
      } else if (res.match(/^major/)) {
        bumpType = 'major';
      } else {
        bumpType = null;
      }

      console.log('bump type: ' + bumpType);

      if (bumpType) {
        gulp.start('release:sequence');
      }
    }));
});

