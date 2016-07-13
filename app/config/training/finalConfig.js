module.exports = function(root, resRoot){

  var fs = require('fs');
  var _ = require('underscore');
  var Subfolder = require('../../lib/Subfolder');

  var config = JSON.parse(fs.readFileSync(root + 'config', 'utf-8'));
  return _.each(config, function(cat){
    cat.path = '/' + cat.folder;
    cat = _.extend(cat,
      new Subfolder(fs.readdirSync(resRoot + cat.path)).build());
  });
};
