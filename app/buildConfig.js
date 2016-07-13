var buildConfig = function(appPath, resPath){

  var path = require('path');
  var _ = require('underscore');
  var fs = require('fs');

  var downloadGenConfig = require('./config/download/genConfig');
  downloadGenConfig(appPath + 'config/download/', resPath + 'download/');

  var trainingGenConfig = require('./config/training/genConfig');
  trainingGenConfig(appPath + 'config/training/', resPath + 'training/');

  var videoGenConfig = require('./config/video/genConfig');
  videoGenConfig(appPath + 'config/video/', resPath + 'video/');
};

module.exports = buildConfig;



