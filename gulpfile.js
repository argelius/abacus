var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    cached = require('gulp-cached'),
    jshint = require('gulp-jshint'),
    bower = require('gulp-bower'),
    connect = require('gulp-connect'),
    html2js = require('gulp-html2js'),
    path = require('path');

var templates = [
  'src/templates/*.html'
]

var sourceFiles = [
  'src/templates/*.js',
  'src/abacus.js', 
  'src/services/*.js',
  'src/directives/*.js'
];

var examples = [
  'examples/*.html',
  'examples/**/*.html'
];

var port = 3002;

gulp.task('templates', function() {
  gulp.src(templates)
    .pipe(html2js({base: path.join(__dirname, '/src'), outputModuleName: 'abacus.templates', useStrict: true, quoteChar: '\''}))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('src/templates'));
});

gulp.task('concat', ['templates'], function() {
  gulp.src(sourceFiles)
    .pipe(sourcemaps.init())
    .pipe(concat('abacus.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'));
});

gulp.task('minify', ['templates'], function() {
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
  bower();
});

gulp.task('build', ['jshint', 'concat', 'minify']);

gulp.task('listen', function() {
  connect.server({
    root: __dirname,
    livereload: true
  });
});

gulp.task('watch', ['bower', 'build', 'listen'], function() {
  gulp.watch(['src/**/*.js', 'src/*.js'], ['build']);
});


