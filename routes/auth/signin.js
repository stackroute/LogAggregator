var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (!req.user) {
    res.render('signin', {
      title: 'Sign-in Form',
      messages: req.flash('error') || req.flash('info')
    });
  } else {
    return res.redirect('/');
  }
});

router.post('/', function(req, res) {
  passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/signin',
   failureFlash: true
 });
});

module.exports = router;
