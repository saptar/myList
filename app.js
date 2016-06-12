var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var path = require('path');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

/*
 * load the process env vars
 * 
 * */
dotenv.load({path : '.env.dev'});

/*
 * MongoDB connection 
 * Urls mentioned in the .env.dev file
 */
mongoose.connect(process.env.MONGODB || process.evn.MONGOLAB_URI);
mongoose.connection.on('error',function(){
	console.error('MongoDB connection error, pls make sure that the mongod instance is running');
	process.exit(1);
});

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var userController = require('./controllers/user');

/**
 * Create Express server.
 */
var app = express();
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8888);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', mustacheExpress());          // register file extension mustache
app.set('view engine', 'html');                 // register file extension for partials
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(flash());
app.use(express.static(path.join(__dirname, 'my-list-frontEnd'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController);
app.get('/signup',userController.getSignup);
app.post('/signup',userController.postSignup);

app.listen(app.get('port'),'192.168.0.5', function() {
	  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
	});
module.exports = app;
