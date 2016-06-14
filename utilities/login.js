// logic to control login

var _= require('lodash');
var path = require('path');
var crypto = require('crypto');
var User = require('./../models/User.js');
var passport = require('passport');

var login = {};

login.getLogin = function(req,res,next){
	if(req.user){
		return res.redirect('/');
	}
	else{
		res.render('../views/account/login.html',{
			title: 'mylist-login'
		});
	}
};
login.postLogin = function(req,res,next){
	req.assert('email', 'Email is not valid').isEmail();
	req.assert('password', 'Password cannot be blank').notEmpty();
	req.sanitize('email').normalizeEmail({ remove_dots: false });

	var errors = req.validationErrors();

	if (errors) {
		req.flash('errors', errors);
		return res.redirect('/login');
	}
	passport.authenticate('local', function(err, user, info) {
	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      req.flash('errors', info);
	      return res.redirect('/login');
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	        return next(err);
	      }
	      req.flash('success', { msg: 'Success! You are logged in.' });
	      res.redirect(req.session.returnTo || '/');
	    });
	  })(req, res, next);
}

module.exports = login;