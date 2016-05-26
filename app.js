/**
 * define require module
 */
var express = require('express'),
    routes = require('./routes/index'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

/** 
 * view engine setup
 */
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);


/**
 * configure app
 */
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

/**
 * listen port
 */
app.listen(8085, function() {
    console.log('server run');
});
