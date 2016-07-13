module.exports = function(root, resRoot){
  var fs = require('fs');
  var _ = require('underscore');
  var Subfolder = require('../../lib/Subfolder');


  var config = JSON.parse(fs.readFileSync(root + 'config', 'utf-8'));
  return _.each(config, function(cat){

    _.each(cat.subs, function(sub){
      sub.path = '/' + cat.folder + '/' + sub.folder;
      sub = _.extend(sub,
        new Subfolder(fs.readdirSync(resRoot + sub.path)).build());
    });

    cat.admin = !! (_.compact(_.flatten(_.pluck(cat.subs, 'admin' ))).length);
    cat.parent = !! (_.compact(_.flatten(_.pluck(cat.subs, 'parent'))).length);
    cat.student = !! (_.compact(_.flatten(_.pluck(cat.subs, 'student'))).length);
    cat.teacher = !! (_.compact(_.flatten(_.pluck(cat.subs, 'teacher'))).length);
  });
};
