var _= require('lodash');
var path = require('path');
var async = require('async');

var signup = require('../utilities/signup');

var userController = {};

userController.getSignup = function(req, res){
	signup.getSignup(req , res);
}
userController.postSignup = function(req, res, next){
	signup.postSignup(req , res , next);
}
module.exports = userController;