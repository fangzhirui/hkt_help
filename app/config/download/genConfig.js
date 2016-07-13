module.exports = function(root, resRoot){

  var fs = require('fs');
  var _ = require('underscore');
  var deepExtend = require('deep-extend');

  if(fs.existsSync(root + 'config')){
    fs.renameSync(root + 'config', root + 'config.old');
  }

  var neu = (function(resRoot) {

    return _.compact(_.map(fs.readdirSync(resRoot), function(cat) {

      return fs.lstatSync(resRoot + cat).isDirectory() ? {
        folder: cat,
        subs: _.map(fs.readdirSync(resRoot + cat), function(doc) {
          return {
            folder: doc
          };
        })
      } : undefined;
    }));

  })(resRoot);

  var arr2obj = function(cats, haveIndex){
    var obj = {};
    _.each(cats, function(cat, cIndex){
      if(cat.folder && cat.subs){
        obj[cat.folder] = haveIndex ? {
          index: cIndex * 10,
          name: cat.name,
          folder: cat.folder
        } : {
          name: cat.name,
          folder: cat.folder
        };
        _.each(cat.subs, function(sub, sIndex){
          if(sub.folder){
            obj[cat.folder][sub.folder] = haveIndex ? {
              index: sIndex,
              name: sub.name,
              folder: sub.folder
            } : {
              name: sub.name,
              folder: sub.folder
            };
          }
        });
      }
    });
    return obj;
  };

  var obj2Arr = function(x){

    var cats = _.compact(_.map(x, function(value, key){
      var ss = _.extend({}, value);
      delete ss.index;
      delete ss.name;
      var tmp = {
        folder: key,
        name: value.name,
        index: value.index,
        subs: ss
      };
      return fs.existsSync(resRoot + tmp.folder) && fs.lstatSync(resRoot + tmp.folder) ?
        tmp : undefined;
    }));
    cats = _.sortBy(cats, 'index');

    _.each(cats, function(cat){
      delete cat.index;
    });
    _.each(cats, function(cat){
      cat.subs = _.compact(_.map(cat.subs, function(value, key){
        var p = resRoot + cat.folder + '/' + key;
        return fs.existsSync(p) && fs.lstatSync(p).isDirectory ? {
          folder: key,
          name: value.name,
          index: value.index
        } : undefined;
      }));
      cat.subs = _.sortBy(cat.subs, 'index');
      _.each(cat.subs, function(sub){
        delete sub.index;
      });
    });
    return cats;
  };

  var old = fs.existsSync(root + 'config.old') ?
    JSON.parse(fs.readFileSync(root + 'config.old', 'utf-8')) : [];

  neu = deepExtend(arr2obj(neu), arr2obj(old, true));
  var result = _.filter(obj2Arr(neu), function(cat){
    return cat.subs.length > 0;
  });

  fs.writeFileSync(root + 'config', JSON.stringify(obj2Arr(neu), null, 4) , 'utf-8');
};
