module.exports = function(root, resRoot) {

  var fs = require('fs');
  var _ = require('underscore');
  var deepExtend = require('deep-extend');

  if (fs.existsSync(root + 'config')) {
    fs.renameSync(root + 'config', root + 'config.old');
  }

  var neu = (function(downloadPath) {

    return _.compact(_.map(fs.readdirSync(downloadPath), function(mod) {
      return fs.lstatSync(downloadPath + mod).isDirectory() ? {
        folder: mod,
        subs: _.compact(_.map(fs.readdirSync(downloadPath + mod), function(ctg) {

          return fs.lstatSync(downloadPath + mod + '/' + ctg).isDirectory() ? {
            folder: ctg,
            subs: _.map(fs.readdirSync(downloadPath + mod + '/' + ctg), function(doc) {
              return {
                folder: doc,
                subs: (function(path) {
                  var filenames = fs.readdirSync(path);
                  var result = {};
                  _.each(filenames, function(filename) {
                    if (/^[0-9]{1}[\.]{1}[0-9]/.test(filename)) {
                      result[filename] = {};
                    }
                  });
                  return result;
                })(downloadPath + mod + '/' + ctg + '/' + doc)
              };
            })
          } : undefined;
        }))
      } : undefined;
    }));

  })(resRoot);

  var arr2obj = function(mods, haveIndex) {

    var obj = {};
    _.each(mods, function(mod, mIndex) {
      if (mod.folder && mod.subs) {
        obj[mod.folder] = haveIndex ? {
          index: mIndex * 100,
          name: mod.name,
          folder: mod.folder,
        } : {
          name: mod.name,
          folder: mod.folder
        };

      }
      _.each(mod.subs, function(cat, cIndex) {
        if (cat.folder && cat.subs) {
          obj[mod.folder][cat.folder] = haveIndex ? {
            index: cIndex * 10,
            name: cat.name,
            folder: cat.folder
          } : {
            name: cat.name,
            folder: cat.folder
          };
          _.each(cat.subs, function(sub, sIndex) {
            if (sub.folder && sub.subs) {
              obj[mod.folder][cat.folder][sub.folder] = haveIndex ? {
                index: sIndex,
                name: sub.name,
                folder: sub.folder,
                subs: sub.subs
              } : {
                name: sub.name,
                folder: sub.folder,
                subs: sub.subs
              };
            }
          });
        }
      });
    });
    return obj;
  };

  var obj2Arr = function(x) {

    var mods = _.map(x, function(value, key) {
      var ss = _.extend({}, value);
      delete ss.index;
      delete ss.name;
      delete ss.folder;
      var tmp = {
        folder: key,
        name: value.name,
        index: value.index,
        subs: ss
      };
      return fs.existsSync(resRoot + key) ?
        tmp : undefined;
    });
    mods = _.filter(mods, function(cat) {
      return !!cat;
    });
    mods = _.sortBy(mods, 'index');
    _.each(mods, function(mod) {
      delete mod.index;
    });

    _.each(mods, function(mod) {

      mod.subs = _.map(mod.subs, function(value, key) {
        var ss = _.extend({}, value);
        delete ss.index;
        delete ss.name;
        delete ss.folder;
        var tmp = {
          folder: key,
          name: value.name,
          index: value.index,
          subs: ss
        };
        return fs.existsSync(resRoot + mod.folder + '/' + key) ?
          tmp : undefined;
      });
      mod.subs = _.filter(mod.subs, function(cat) {
        return !!cat;
      });
      mod.subs = _.sortBy(mod.subs, 'index');
      _.each(mod.subs, function(cat) {
        delete cat.index;
      });

      //subs
      _.each(mod.subs, function(cat) {
        cat.subs = _.map(cat.subs, function(value, key) {
          var p = resRoot + mod.folder + '/' + cat.folder + '/' + key;
          return fs.existsSync(p) ? {
            folder: key,
            name: value.name,
            subs: value.subs,
            index: value.index
          } : undefined;
        });
        cat.subs = _.filter(cat.subs, function(sub) {
          return !!sub;
        });
        cat.subs = _.sortBy(cat.subs, 'index');
        _.each(cat.subs, function(sub) {
          delete sub.index;
        });
      });

    });
    return mods;
  };

  var old = fs.existsSync(root + 'config.old') ?
    JSON.parse(fs.readFileSync(root + 'config.old', 'utf-8')) : [];

  neu = deepExtend(arr2obj(neu), arr2obj(old, true));

  var result = _.filter(obj2Arr(neu), function(cat) {
    return cat.subs.length > 0;
  });
  //console.log(JSON.stringify(result, null, 4));
  fs.writeFileSync(root + 'config', JSON.stringify(result, null, 4), 'utf-8');
};
