var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  res.redirect(200,'/signin');
});

module.exports = router;
