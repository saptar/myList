var _= require('lodash');
var passport = require('passport');
var request = require('request');
var localStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;

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

// facebook login strategy.
passport.use(new facebookStrategy({
	  clientID: process.env.FACEBOOK_ID,
	  clientSecret: process.env.FACEBOOK_SECRET,
	  callbackURL: '/auth/facebook/callback',
	  profileFields: ['name', 'email', 'link','timezone'],
	  passReqToCallback: true
	},function(req, accessToken, refreshToken, profile, done){
	if(req.user){
		// this use case is for already logged in user
		// who want to link their fb account for login
		User.findOne({facebook: profile.id},function(err, existingUser){
			if(existingUser){
				req.flash('errors',{msg: 'Their is already a facebook account associated with this login, please try a different one'});
				done(err);
			}
			else{
				// find the logged in user and update his/her account with FB profile
				User.findById(req.user.id,function(err, user){
					user.facebook = profile.id;
					user.token.push({kind:'facebook', accessToken: accessToken});
					user.profile.id = user.profile.id || profile.name.givenName;
					user.profile.gender = user.profile.gender || profile._json.gender;
					user.profile.picture = user.profile.picture || 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
					user.save(function(err){
						req.flash('info',{msg: 'You have successfully linked your facebook account'})
					})
				})
			}
		})
	}
	else{
		// if the user is not logged in and
		// wants to login to the application using facebook
		// for the first time
		User.findOne({facebook: profile.id}, function(err, existingUser){
			if(existingUser){
				return done(null,existingUser);
			}
			else{
				User.findOne({email: profile._json.email}, function(err, existingEmailUser){
					if(existingEmailUser){
						req.flash('error',{msg: 'We have found a matching email already a registered user. Try login in using that email'});
						done(err);
					}
					else{
						var user = new User();
						user.email = profile._json.email;
						user.facebook = profile.id;
						user.tokens.push({ kind: 'facebook', accessToken: accessToken });
						user.profile.name = profile.name.givenName + ' ' + profile.name.familyName;
						user.profile.gender = profile._json.gender;
						user.profile.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
						//user.profile.location = (profile._json.location) ? profile._json.location.name : '';
						user.save(function(err) {
							done(err, user);
						});
					}
				})
			}
		})
	}
}

));
