var express = require('express');
var passport = require('passport');
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

router.post('/',
  passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/signin',
   failureFlash: true
}));

module.exports = router;
