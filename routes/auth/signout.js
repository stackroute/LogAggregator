var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
  res.redirect(200,'back/signin');
});

module.exports = router;
