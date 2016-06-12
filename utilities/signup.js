// this module holds the logic for user sign up

var _= require('lodash');
var path = require('path');
var crypto = require('crypto');
var User = require('./../models/User.js');



var signup = {};
/*
 * Method to render the signup page
 */
signup.getSignup = function(req, res){
	if(req.user){
		return res.redirect('/');
	}
	else{
		res.render('../views/account/signup',{
			title:"mylist-signup"
		})
	}
};

/*
 * method to receive post form submission
 * and create a user object and persist.
 */
signup.postSignup = function(req, res, next){
	console.log(req.body.email);
	req.assert('email', 'Email is not valid').isEmail();
  	req.assert('password', 'Password must be at least 4 characters long').len(4);
  	req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
	var errors = req.validationErrors();
	
	if(errors){
		//req.flash('errors',errors);
		console.log(errors);
		// TODO: change the redirect to login page.
		return res.redirect('/');
	}
	
	var user = new User({
		email: req.body.email,
		password : req.body.password
	});
	
	User.findOne({email: req.body.email}, function(err,existingUser){
		if(existingUser){
			//req.flash('errors',{msg:'An user with this email id already exits'});
			// TODO: change the redirect to login page
			res.redirect('/');
		}
		else{
			user.save(function(err){
				if(err){
					return next(err);
				}
				console.log('user successfully saved ; redirecting to home page');
				return res.redirect('/');
				// TODO: use passports req.login to call login and redirect user
			})
		}
	});
	
	
};

module.exports = signup;
