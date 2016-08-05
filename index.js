/**
 * define require module
 */
var express = require('express'),
    routes = require('./routes/index'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port=process.env.PORT||8086,
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
app.listen(port, function() {
    console.log('server run');
});
