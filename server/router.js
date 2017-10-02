var path = require('path');
var express = require('express');
var passport = require('passport');
var account = require('./models/accounts');
var client = require('./models/clients');
var posts = require('./models/posts');
var activities = require('./models/activities');
var semester = require('./models/semesters');
var jwt = require('jsonwebtoken');

var router = express.Router();

// Check user Level
function hasRole(role) {
    return function (req, res, next) {
        if (role.indexOf(req.user.userType) !== -1) {
            next();
        } else {
            res.send(403);
        }
    }
}

// Validate Characters for strange inputs
function validateCharacters(val) {
    if (/^[a-zA-Z()]+$/.test(val) && val != "") {
        return true;
    } else {
        return false;
    }
}

// Return Server Status
router.get('/api/status', function(req, res){
    res.status(200).send("Server Running!");
});

// Check if Organization Exists
router.get('/api/check_organization', function(req, res){
    var org = req.headers['organization'];
    if (!validateCharacters(org)) {
        res.status(400).json({ valid: false, msg: "Please enter a valid organization name" });
        return;
    }
    client.findOne({ 'clientSubdomain': org }).exec(function(err, response) {
        if (response != null) {
            res.status(200).json({ valid: true });
        } else {
            res.status(200).json({ valid: false, msg: "Please enter a valid organization name" });
        }
    });
});

router.post('/api/login', function(req, res) {
    account.findOne({
        email: req.body.email
    }, function(err, user) {
    if (err) throw err;

    if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user.toObject(), 'secretkey43565674567473', {
                expiresIn: 100000 // in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
        } else {
            res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
        });
    }
    });
});

router.get('/api/testauth', passport.authenticate('jwt', { session: false }), hasRole(["user", "admin"]), function(req, res) {  
    res.send('It worked! User id is: ' + req.user._id + '.');
});

router.post('/api/register', function(req, res) {
    var userData = {
        email: req.body.email,
        password: req.body.password,
      }
    account.create(userData, function (err, user) {
    if (err) {
        res.send({ success: false, message: 'User could not be created ' + err });
    } else {
        return res.redirect('/profile');
    }
    });
});

router.get('/api/logout', function(req, res) {
    req.logout();
    res.status(200).send("Logged Out!");
});

router.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;
