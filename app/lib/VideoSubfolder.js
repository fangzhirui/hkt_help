var _ = require('underscore');

var etctFilename = function(names, alias) {
  //['3.1.48.zh.mp4', '3.1.48.en.mp4'],
  /*{
      'zh': "",
      'en': ""
    }
  */

  names = _.sortBy(names, function(name) {
    return name.indexOf('zh') < 0
  });

  return _.map(names, function(name) {
    var tmp = name.split('.');
    var infoArr = tmp.slice(tmp.length - 3, tmp.length - 1);
    var namekey = tmp.slice(0, 2).join('.');
    if (infoArr.length == 2) {
      return {
        file: '/' + name,
        name: name.indexOf('zh') > 0 ? alias.zh : alias.en,
        auth: infoArr[0].split('')
      };
    }
  });
};

var VideoSubfolder = function(folders, filenames, aliasMapping) {
  //['3.1','3.2']
  //{
  //  '3.1': ['3.1.48.zh.mp4', '3.1.48.en.mp4'],
  //  '3.2': ['3.2.48.zh.mp4', '3.2.48.en.mp4']
  //}
  /*{
    '3.1': {
      'zh': "",
      'en': ""
    },
    '3.2': {
      'zh': "",
      'en': ""
    }
  }
  */

  this.fileAttrs = _.compact(_.map(folders, function(folder) {
    return etctFilename(filenames[folder], aliasMapping[folder]);
  }));
};

VideoSubfolder.prototype.build = function() {

  var filterFileAttr = function(fileAttrs, auth) {

    var f = _.compact(_.filter(fileAttrs, function(fileAttr) {
      if (_.contains(_.union(_.flatten(_.pluck(fileAttr, 'auth'))), auth)) {
        return fileAttr;
      }
    }));

    var result = f.length ? _.map(f, function(folder) {
      return _.map(folder, function(value) {
        return {
          file: value.file,
          name: value.name
        };
      });
    }) : undefined;

    return _.sortBy(result, function(element) {
      var s = element[0].file.match(/\d/g).join('');
      return /^\d+$/.test(s) ? parseInt(s) : 0;
    });
  };

  var result = {};
  result.student = filterFileAttr(this.fileAttrs, '2');
  result.teacher = filterFileAttr(this.fileAttrs, '4');
  result.admin = filterFileAttr(this.fileAttrs, '8');
  result.parent = filterFileAttr(this.fileAttrs, '1');
  return result;
};

module.exports = VideoSubfolder;
