var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/:pathId', function(req, res  ) {

   var pathId = req.params.pathId;

   var filename = "path"+pathId+".json";
   var file = fs.readFileSync('json/logListing/'+filename, 'utf-8');
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
