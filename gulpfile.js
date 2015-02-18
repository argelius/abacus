var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    jshint = require('gulp-jshint'),
    bower = require('gulp-bower'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver');

var sourceFiles = [
  'src/abacus.js', 
  'src/services/*.js', 
  'src/directives/*.js'
];

var examples = [
  'examples/*.html',
  'examples/**/*.html'
];

var port = 3002;

gulp.task('concat', function() {
  gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('abacus.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify', function() {
  gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('abacus.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});
 
gulp.task('jshint', function() {
  gulp.src(sourceFiles)
    .pipe(cached('js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('build', ['concat', 'minify', 'jshint']);

gulp.task('watch', ['bower', 'build'], function() {
  gulp.src(__dirname)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));

  gulp.watch(sourceFiles.concat(examples), ['build']);
});


