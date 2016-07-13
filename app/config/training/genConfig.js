
module.exports = function(root, resRoot){
  var fs = require('fs');
  var _ = require('underscore');
  var deepExtend = require('deep-extend');


  if(fs.existsSync(root + 'config')){
    fs.renameSync(root + 'config', root + 'config.old');
  }

  var neu = (function(trainingPath) {

    var arr = _.map(fs.readdirSync(trainingPath), function(ctg) {

      return fs.lstatSync(trainingPath + '/' + ctg).isDirectory() ? {
        folder: ctg
      } : undefined;
    });

    return _.filter(arr, function(element){
      return !!element;
    });

  })(resRoot);

  var arr2obj = function(cats, haveIndex){
    var obj = {};
    _.each(cats, function(cat, cIndex){
      if(cat.folder){
        obj[cat.folder] = haveIndex ? {
          index: cIndex * 10,
          name: cat.name
        } : {
          name: cat.name
        };
      }
    });
    return obj;
  };

  var obj2Arr = function(cats, haveIndex){

    var subs = _.map(cats, function(value, key){
      return {
        folder: key,
        name: value.name,
        index: value.index,
      };
    });
    subs = _.sortBy(subs, 'index');
    _.each(subs, function(sub){
      delete sub.index;
    });
    return _.filter(_.map(subs, function(sub, index){
      if(fs.existsSync(resRoot + sub.folder) && fs.lstatSync(resRoot + sub.folder).isDirectory()){
        return sub;
      }
    }), function(sub){
      return !!sub;
    });
  };

  var old = fs.existsSync(root + 'config.old') ?
    JSON.parse(fs.readFileSync(root + 'config.old', 'utf-8')) : [];

  neu = deepExtend(arr2obj(neu), arr2obj(old, true));
  fs.writeFileSync(root + 'config', JSON.stringify(obj2Arr(neu), null, 4) , 'utf-8');

};

