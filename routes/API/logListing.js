var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/:href', function(req, res  ) {

   var href = req.params.href;

   var filename = "path"+href+".json";
   var file = fs.readFileSync('json/logListing/'+filename, 'utf-8');
   //var obj =  JSON.parse(file);
   res.send(file);

});


router.get('/All', function(req, res) {
  var file = fs.readFileSync('json/logListing/pathall.json','utf-8');
  res.send(file);
});


router.get('/', function(req, res ) {
  var file = fs.readFileSync('json/logListing/paths.json','utf-8');
  res.send(file);
});



module.exports = router;
