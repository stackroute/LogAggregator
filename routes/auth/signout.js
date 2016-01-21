var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  req.logout();
   res.redirect('/signin',{
    title: 'Sign-in Form',
    messages: req.flash('error') || req.flash('info')
  });
});

module.exports = router;
