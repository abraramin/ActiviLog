// LOAD PACKAGES //
var path = require('path');
var fs = require('fs');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// IMPORT ROUTER //
var indexRoutes = require('./routes/index');

// CREATE EXPRESS APP //
var app = express();
app.set('view engine', 'html');
app.engine('html', function (path, options, callbacks) {
  fs.readFile(path, 'utf-8', callback);
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));

// ROUTES //
app.use('/', indexRoutes);

// LOAD MONGOOSE DATABASE //
mongoose.connect('mongodb://user_01:dbpass123@ds121171.mlab.com:21171/clinical_placements', {
    useMongoClient: true,
});

// CONFIGURE PASSPORT //
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// ERROR HANDLER //
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
});

module.exports = app;
