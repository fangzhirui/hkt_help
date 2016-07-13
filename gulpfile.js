var gulp = require('gulp');
var _ = require('underscore');
var template = require('gulp-template');
var search = require('./app/search');
var pathM = require('path');
var concat = require('gulp-concat');
var fs = require('fs');
var ftp = require('vinyl-ftp');
var gutil = require('gulp-util');

gulp.task('buildphp', function() {

	search({
		path: pathM.normalize(process.cwd() + '/resources/download'),
		key: '*.pdf'
	}, function(obj) {
		gulp.src('./app/php/download_interceptor.php')
			.pipe(template({
				download: JSON.stringify(obj)
			}))
			.pipe(gulp.dest('./app/php.dist'));
	});

	search({
		path: pathM.normalize(process.cwd() + '/resources/training'),
		key: '*.pdf'
	}, function(obj) {
		gulp.src('./app/php/training_interceptor.php')
			.pipe(template({
				training: JSON.stringify(obj)
			}))
			.pipe(gulp.dest('./app/php.dist'));
	});

	search({
		path: pathM.normalize(process.cwd() + '/resources/video'),
		key: '*.mp4'
	}, function(obj) {
		gulp.src('./app/php/video_interceptor.php')
			.pipe(template({
				video: JSON.stringify(obj)
			}))
			.pipe(gulp.dest('./app/php.dist'));
	});
});

gulp.task('buildcss', function() {
	gulp.src('./app/tpl/css/style.min.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./app/tpl.dist/css'));
});

gulp.task('buildConfig', function(){
  var resPath = './resources/';
  var appPath = './app/';
  require('./app/buildConfig')(appPath, resPath);
});

gulp.task('checkConfig', function(){
  require('./app/checkConfig')();
});

gulp.task('buildhtml', function() {
    /*    */
	var resPath = './resources/';
	var appPath = './app/';
	var page = require('./app/pageMain')(appPath, resPath);


	gulp.src('./app/tpl/cpnt/help_admin.html')
		.pipe(template(page.admin))
		.pipe(concat('help_admin.tpl')) //rename
		.pipe(gulp.dest('./app/tpl.dist'));

	gulp.src('./app/tpl/cpnt/help_teacher.html')
		.pipe(template(page.teacher))
		.pipe(concat('help_teacher.tpl'))
		.pipe(gulp.dest('./app/tpl.dist'));

	gulp.src('./app/tpl/cpnt/help_student.html')
		.pipe(template(page.student))
		.pipe(concat('help_student.tpl'))
		.pipe(gulp.dest('./app/tpl.dist'));

	gulp.src('./app/tpl/cpnt/help_parent.html')
		.pipe(template(page.parent))
		.pipe(concat('help_parent.tpl'))
		.pipe(gulp.dest('./app/tpl.dist'));
});

gulp.task('deploy', ['buildhtml'], function(){

  setTimeout(function(){
  	var tplDist = './app/tpl.dist';
  	var phpDist = './app/php.dist';

    var conn = ftp.create({
      host: '10.11.18.120',
      user: 'usnmp@192.168.132.226',
      password: 'U1s2n3mP',
      parallel: 4,
      log: gutil.log
    });

    gulp.src([tplDist + '/*.tpl'], {
      buffer: false
    })
    .pipe(conn.dest('/var/www/hkt/portal/hkt_help'));

  }, 500);
});
