var express = require('express');
var fs = require('fs')
var path = require('path')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = fs.readFileSync("json/userAgent/agentData.json", "utf8");
  res.send(data);
});

module.exports = router;
