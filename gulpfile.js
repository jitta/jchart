var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),

    header = ";(function() {",
    footer = "}.call(this));";

gulp.task('dist', function() {
  gulp.src(['./src/helper.coffee','./src/lodash.custom.js','./src/jchart.coffee'])
      .pipe(gulpif(/[.]coffee$/, coffee({bare: true})))
      .pipe(concat('jchart.js'))
      .pipe(concat.header(header))
      .pipe(concat.footer(footer))
      .pipe(gulp.dest('./dist/'))
      .pipe(rename('jchart.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/'))
})