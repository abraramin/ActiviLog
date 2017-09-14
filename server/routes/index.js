var path = require('path');
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/api/status', function(req, res){
    res.status(200).send("Running!");
});

router.get('/api/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/api/register', function(req, res) {
    res.render('register', { });
});

router.post('/api/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if(err) {
            res.status(400).send("failure! " + err);
        };

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/api/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../client/index.html'));
});

module.exports = router;
