var gulp = require('gulp'),
  traceur = require('gulp-traceur'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')

var sourceFiles = [
  'src/*.es6'
];

gulp.task('concat', function() {
  return gulp.src('src/*.es6')
    .pipe(traceur())
    .pipe(concat('abacus.js'))
    .pipe(gulp.dest(__dirname + '/dist/'));
});

gulp.task('listen', function() {
  connect.server({
    root: __dirname,
    livereload: true
  });
});

gulp.task('watch', ['build', 'listen'], function() {
  gulp.watch(sourceFiles, ['build']);
});


