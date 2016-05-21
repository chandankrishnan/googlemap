var express = require('express');
var routes = require('./routes/index');
var bodyParser=require('body-parser');
var path = require('path');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

app.listen(8082, function() {
    console.log('server run');
})
