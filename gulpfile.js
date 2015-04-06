var gulp = require('gulp'),
  babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),
  connect = require('gulp-connect'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber');

var sourceFiles = [
  'src/*.es6'
];

var onError = function(err) {
  gutil.beep();
  gutil.log(err);
};

gulp.task('concat', function() {
  return gulp.src('src/*.es6')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('abacus.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(__dirname + '/dist/'));
});

gulp.task('minify', function() {
  return gulp.src('src/*.es6')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('abacus.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(__dirname + '/dist/'));
});

gulp.task('build', ['concat', 'minify']);

gulp.task('listen', function() {
  connect.server({
    root: __dirname,
    livereload: true
  });
});

gulp.task('watch', ['build', 'listen'], function() {
  gulp.watch(sourceFiles, ['build']);
});
