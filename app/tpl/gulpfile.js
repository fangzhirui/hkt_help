var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var base64 = require('gulp-base64');
var uglifycss = require('gulp-uglifycss');
var concat = require('gulp-concat');

/*
  minify img
 */
var devPrefix = '.';
var distPrefix = './img.dist';
gulp.task('minifyImg', function() {
  gulp.src(devPrefix + '/img/**/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }, {
        cleanupIDs: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(distPrefix));
});

gulp.task('buildcss', function() {
  gulp.src('./css/style.css')
    .pipe(base64({
      maxImageSize: 100 * 1024 // bytes
    }))
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./css'));
});
