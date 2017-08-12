//Packages
var path = require('path');
var fs = require('fs');
var express = require('express');


//Imports
var indexRoutes = require('./routes/index');

//Create App
var app = express();

//View engines
app.set('view engine', 'html');
app.engine('html', function(path, options, callbacks){
  fs.readFile(path, 'utf-8', callback);
});

//Middleware
app.use(express.static(path.join(__dirname, "../client")));

//Routes
app.use('/', indexRoutes);

//Error handling
app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

module.exports = app;
