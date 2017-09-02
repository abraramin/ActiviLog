var path = require('path');
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = require('express').Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {

        console.log("req data")
        console.log(req.body);

        if (err) {
            res.status(400).send("failure! " + err);
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
