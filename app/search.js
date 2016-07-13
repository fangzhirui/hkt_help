var search = function(param, callback) {
	/*
		param = {
			path: '/home/fangzhirui/zzz/help/hkt_help/resources/download',
			key: '*.pdf'
		}
	*/
	var exec = require('child_process').exec;

	var cmd = process.platform == 'win32' ?
		'for /r ' + param.path + ' %i in (' + param.key + ') do @echo %i' :
		'find ' + param.path + ' -name ' + param.key ;
	var _ = require('underscore');
	var path = require('path');

	exec(cmd, function(err, stdout, stderr) {
		if (err) {
			console.log(err);
		} else {
			var files = _.compact(_.map(stdout.split(/[\t\n]+/g), function(value) {
				var filename = path.parse(value.trim()).base;
				if (filename && filename.length) {
					var fileinfoArr = filename.split('.');
					return {
						name: filename.trim(),
						path: value.replace(path.dirname(path.dirname(param.path)), '').trim(),
						auth: _.map(fileinfoArr[fileinfoArr.length - 3].split(''), function(value) {
							return parseInt(value);
						})
					};
				}
			}));

			var obj = {};
			_.each(files, function(file) {
				obj[file.name] = {
					path: process.platform == 'win32' ? file.path.replace(/\\/g, '/') : file.path,
					auth: file.auth
				};
			});
			callback(obj);
		}
	});
};

module.exports = search;
