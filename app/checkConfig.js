var fs = require('fs');
var _ = require('underscore');
var path = require('path');

var checkConfig = function() {

  var configParentPath = process.cwd() + '/app/config';
  var badReasons = _.chain(fs.readdirSync(configParentPath))
    .map(function(ele, index) {
      return path.normalize(configParentPath + '/' + ele);
    })
    .map(function(folderpath, index) {
      return path.normalize(folderpath + '/config');
    })
    .map(function(fullpath, index) {
      contentStr = fs.readFileSync(fullpath, 'utf-8');
      if (!contentStr || !contentStr.trim().length) {
        return fullpath + ' could not be blank';
      }
      if (/.*?"[\s\r\t]*".*?/.test(contentStr)) {
        return fullpath + ' could not contain ""';
      }
      try {
        obj = JSON.parse(contentStr);
        if (!_.isArray(obj)) {
          return fullpath + ' is not array';
        }
      } catch (err) {
        return fullpath + ' is not in json format';
      }
      return true;
    })
    .filter(function(element) {
      return element !== true;
    })
    .value();

  if (badReasons.length) {
    console.log(badReasons[0]);
  } else {
    console.log('check ok');
  }

};

module.exports = checkConfig;
