var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/:href', function(req, res, next) {

   var href = req.params.href;
   var filename = "path"+href+".json";
   var file = fs.readFileSync('json/logListing/'+filename, 'utf-8');

   res.send(file);

});


router.get('/All', function(req, res, next) {
  var file = fs.readFileSync('json/logListing/pathall.json','utf-8');
    res.send(file);
});

router.get('/', function(req, res, next) {
  var file = fs.readFileSync('json/logListing/paths.json','utf-8');
    res.send(file);
});


module.exports = router;
