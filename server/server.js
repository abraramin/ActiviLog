// LOAD PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var db = require('./models/db.js')

// IMPORT ROUTER //
var indexRoutes = require('./routes/index');
// CREATE EXPRESS APP //
var app = express();


app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});


var sess = {
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
	//cookie: { secure: true } //not going to be used for HTTP connections.
}


app.use(session(sess));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


app.use(passport.initialize());
app.use(passport.session());

/* PUBLIC DIR - for HTML/CSS */
//app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../public')));


// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');


// ROUTES //
app.use('/', indexRoutes);

// LOAD MONGOOSE DATABASE //
//mongoose.connect('mongodb://user_01:dbpass123@ds121171.mlab.com:21171/clinical_placements', {
//    useMongoClient: true,
//});

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});


module.exports = app;

// CONFIGURE PASSPORT //
var Account = require('./models/account_model');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
