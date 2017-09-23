var path = require('path');
var express = require('express');
var passport = require('passport');
var account = require('./models/account');
var client = require('./models/client');
var router = express.Router();


// Logged In User Function
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.status(400).send("Not Logged In!");
}

// Return Server Status
router.get('/api/status', function(req, res){
    res.status(200).send("Server Running!");
});

// Check if Organization Exists
router.get('/api/check_organization', function(req, res){
    client.find({}, function (err, data) {
        if (err) return console.error(err);
        res.status(200).send(data);
    })
});

router.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.json({ user: req.user });
});

router.post('/api/register', function(req, res) {
    account.register(new account({ username : req.body.username }), req.body.password, function(err, account) {
        if(err) {
            res.status(400).send("failure! " + err);
        };

        passport.authenticate('local')(req, res, function () {
            res.json({user: req.user });
        });
    });
});

router.get('/api/logout', function(req, res) {
    req.logout();
    res.status(200).send("Logged Out!");
});

router.post('/api/profile', isLoggedIn, function(req, res) {
    if(err) {
        res.status(400).send("failure! " + err);
    };

    res.status(200).send("Here is the profile data");
});

router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;
