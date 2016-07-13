var pageMain = function(appPath, resPath){

  var path = require('path');
  var _ = require('underscore');
  var template = require('./lib/template');
  var fs = require('fs');

  template.config('escape', false);
  template.helper('enFormat', function(str){
  
    str = str.replace(/&nbsp;/g, 'SPACECHARACTER');
    str = str.replace(/([\s\-\–A-Za-z]+)/g, '<span class="en">$1</span>');
    return str.replace(/SPACECHARACTER/g, '&nbsp;');
  });

  template.helper('getP2', function(str){
    if(str.indexOf('/') === 0){
      str = str.slice(1, str.length);
    }
    var tmp = str.split('.');
    return tmp.slice(0, 2).join('.');
  });

  template.helper('getP_1', function(str){
    if(str.indexOf('/') === 0){
      str = str.slice(1, str.length);
    }
    var tmp = str.split('.');
    return tmp.slice(0, tmp.length - 1).join('.');
  });


  template.helper('extLang', function(str){
    var tmp = str.split('.');
    return (tmp[tmp.length -2].indexOf('zh') >= 0) ? 'zh' : 'en';
  });

  template.helper('langBtn', function(str){
    var tmp = str.split('.');
    return (tmp[tmp.length -2].indexOf('zh') >= 0) ? '中文版' : 'English';
  });

  template.helper('encode', function(str){
    return str ? encodeURIComponent(new Buffer(str).toString('base64')) : undefined;
  });

  template.helper('rmSlash', function(str){
    return str && str.trim().slice(0,1) == '/' ? str.trim().slice(1) : str.trim();
  });

  var downloadGenFinalConfig = require('./config/download/finalConfig');
  var trainingGenFinalConfig = require('./config/training/finalConfig');
  var videoGenFinalConfig = require('./config/video/finalConfig');

  var publicJson = {
    video: videoGenFinalConfig(appPath + 'config/video/', resPath + 'video/'),
    download: downloadGenFinalConfig(appPath + 'config/download/', resPath + 'download/'),
    training: trainingGenFinalConfig(appPath + 'config/training/', resPath + 'training/')
  };

  //finalJson
  fs.writeFileSync('1.txt', JSON.stringify(publicJson.video), 'utf-8');

  var adminJson = _.extend({
    role: 'admin'
  }, publicJson);

  var studentJson = _.extend({
    role: 'student'
  }, publicJson);

  var parentJson = _.extend({
    role: 'parent'
  }, publicJson);

  var teacherJson = _.extend({
    role: 'teacher'
  }, publicJson);

  var studentPage = {
    download: (function(){
      var r = template.compile(fs.readFileSync(appPath + 'tpl/cpnt/download.html', 'utf-8'));
      return r(studentJson);
    })()
  };

  var parentPage = {
    download: (function(){
      var r = template.compile(fs.readFileSync(appPath + 'tpl/cpnt/download.html', 'utf-8'));
      return r(parentJson);
    })()
  };

  var teacherPage = {
    video: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/video.html', 'utf-8'))(teacherJson),
    download: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/download.html', 'utf-8'))(teacherJson),
    training: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/training.html', 'utf-8'))(teacherJson),
    script: fs.readFileSync(appPath + 'tpl/cpnt/script.js', 'utf-8')
  };

  var adminPage = {
    video: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/video.html', 'utf-8'))(adminJson),
    download: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/download.html', 'utf-8'))(adminJson),
    training: template.compile(fs.readFileSync(appPath + 'tpl/cpnt/training.html', 'utf-8'))(adminJson),
    script: fs.readFileSync(appPath + 'tpl/cpnt/script.js', 'utf-8')
  };

  return {
    student: studentPage,
    parent: parentPage,
    teacher: teacherPage,
    admin: adminPage
  };
};

module.exports = pageMain;
