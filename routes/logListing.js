var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/:href', function(req, res, next) {

   var href = req.param('href');
   var filename = "path"+href+".json";
   var file = fs.readFileSync('json/logListing/ '+filename, 'utf-8');
   //var obj =  JSON.parse(file);
   res.send(file);

}


router.get('/All', function(req, res, next) {
  var file = fs.readFileSync('pathall.json','utf-8')
});



module.exports = router;
