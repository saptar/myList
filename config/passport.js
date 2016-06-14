var _= require('lodash');
var passport = require('passport');
var request = require('request');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/User');

// used for persistent user session
passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		done(err,user);
	})
});

// login using local strategy
// login using username and password
passport.use(new localStrategy({usernameField : 'email' },function(email,password,done){
	User.findOne({email: email.toLowerCase()}, function(err,user){
		if(!user){
			return done(null,false,{msg: 'Email '+email+' not found'})
		}
		user.comparePassword(password,function(error, isMatch){
			if(isMatch){
				return done(null,user);
			}
			else{
				return done(null, false, {msg: 'Invalid username or passport'});
			}
		})
	})
}));