module.exports = function(root, resRoot) {
  var _ = require('underscore');
  var setDefaultOpen = (function() {
    var c = true;
    return function() {
      if (c) {
        c = !c;
        return true;
      }
    };
  })();

  var fs = require('fs');

  var VideoSubfolder = require('../../lib/VideoSubfolder');

  var config = JSON.parse(fs.readFileSync(root + 'config', 'utf-8'));
  return _.each(config, function(mod) {
    _.each(mod.subs, function(cat) {
      cat.open = setDefaultOpen();
      _.each(cat.subs, function(sub) {
        sub.path = '/' + mod.folder + '/' + cat.folder + '/' + sub.folder;
        //console.log(resRoot + sub.path + '  |   ' + fs.readdirSync(resRoot + sub.path));
        var videoSubfolder = new VideoSubfolder(
          _.compact(_.filter(fs.readdirSync(resRoot + sub.path), function(folder) {
            if (!/jpg$/.test(folder)) {
              return folder;
            }
          })),
          (function(path) {
            var r = {};
            var folders = fs.readdirSync(path);
            _.each(folders, function(folder) {
              if (/jpg$/.test(folder)) {
                return;
              } else {
                r[folder] = fs.readdirSync(path + '/' + folder);
              }
            });
            return r;
          })(resRoot + sub.path),
          sub.subs);
        sub = _.extend(sub, videoSubfolder.build());
        delete sub.subs;
      });
      cat.admin = !!(_.compact(_.flatten(_.pluck(cat.subs, 'admin'))).length);
      cat.parent = !!(_.compact(_.flatten(_.pluck(cat.subs, 'parent'))).length);
      cat.student = !!(_.compact(_.flatten(_.pluck(cat.subs, 'student'))).length);
      cat.teacher = !!(_.compact(_.flatten(_.pluck(cat.subs, 'teacher'))).length);
    });
  });

};
