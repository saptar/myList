var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mustacheExpress = require('mustache-express');
var path = require('path');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');

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
app.use(express.static(path.join(__dirname, 'my-list-frontEnd'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.get('/', homeController);

app.listen(app.get('port'),'192.168.0.5', function() {
	  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
	});
module.exports = app;
