var _ = require('underscore');

var etctFilename = function(name, parentPath){
	//Admin.8.zh.pdf
	//parentPath = '/aaa/bbb'
	var tmp = name.split('.');
	var infoArr = tmp.slice(tmp.length - 3, tmp.length - 1);
	if(infoArr.length == 2){
		return {
			file: (parentPath ? parentPath : '') + '/' + name,
			auth: infoArr[0].split(''),
			lang: infoArr[1]
		};
	}
};

var Subfolder = function(filenames, parentPath){
  this.fileAttrs = _.compact(_.map(filenames, function(filename){
  	return etctFilename(filename, parentPath);
  }));
};

Subfolder.prototype.build = function(){

	var filterFileAttr = function(fileAttrs, auth){
		var f = _.compact(_.filter(fileAttrs, function(fileAttr){
			if(_.contains(fileAttr.auth, auth)){
				return fileAttr;
			}
		}));

		return f.length ? _.pluck(f, 'file'): undefined;
	};

	var result = {};
	result.student = filterFileAttr(this.fileAttrs, '2');
	result.teacher = filterFileAttr(this.fileAttrs, '4');
	result.admin = filterFileAttr(this.fileAttrs, '8');
	result.parent = filterFileAttr(this.fileAttrs, '1');
	return result;
};

module.exports = Subfolder;
