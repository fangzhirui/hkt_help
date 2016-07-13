var express = require('express');
var router = express.Router();
var pathM = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(process.cwd());
  //res.render('index', { title: 'Express' });
});

router.get('/:tplname', function(req, res, next) {

  var path =
    pathM.join(__dirname, '/../../tpl.dist/', req.params.tplname);
  //res.send(req.params.tplname + "  " + path);

  fs.readFile(path, 'utf-8', function(err, data) {
    res.set({
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.send(data);
  });
});


module.exports = router;
