var _= require('lodash');
var path = require('path');
var async = require('async');

var signup = require('../utilities/signup');
var login = require('../utilities/login');

var userController = {};

userController.getSignup = function(req, res){
	signup.getSignup(req , res);
}
userController.postSignup = function(req, res, next){
	signup.postSignup(req , res , next);
}
userController.getLogin = function(req,res,next){
	login.getLogin(res, res, next);
}
userController.postLogin = function(req, res, next){
	login.postLogin(req,res,next);
}
module.exports = userController;