'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pump = require('pump');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.scss', ['sass']);
});
 
gulp.task('compress', function (cb) {
  pump([
        gulp.src('src/lib/*.js')
          .pipe(rename({suffix: '.min'})),
        uglify({

          mangle: true,
          output: {
            
              beautify: true,
              comments: "all"
          }
        }),
        gulp.dest('dist')
    ],
    cb
  );
});