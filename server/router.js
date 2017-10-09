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

const ACCOUNT_TYPE = {
    UNREGISTERED: 0,
    ADMINISTRATOR: 1,
    SUPERVISOR: 2,
    USER: 3,
};

// Check user Level
function hasRole(role) {
    return function (req, res, next) {
        if (role.indexOf(req.user.userType) !== -1) {
            next();
        } else {
            res.status(403).json({ success: false, message: "You are not authorized to make this request" })
        }
    }
}

function visitor() {
    return function (req, res, next) {
        if (req.user == null) {
            next();
        } else {
            res.status(403).json({ success: false, message: "You are not authorized to make this request" });
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

function validatePassword(val) {
    if (/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(val) && val != "") {
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
            res.status(200).json({ valid: true});
        } else {
            res.status(200).json({ valid: false, msg: "Please enter a valid organization name" });
        }
    });
});

router.post('/api/login', visitor(), function(req, res) {
    client.findOne({ 'clientSubdomain': req.body.organization}).exec().then(function(organization) {
        if (organization != null) {
            const orgId = organization._id.toString();
            account.findOne({
                email: req.body.email,
                organizationId: orgId,
                active: true,
            }, function(err, user) {
            if (err) throw err;
        
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
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
                    res.json({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
                });
            }
            });
        } else {
            res.json({ success: false, message: 'Authentication failed. Organization Could not be found' });
        }
    });
});

router.get('/api/fetch_user', passport.authenticate('jwt', { session: false }), hasRole([ACCOUNT_TYPE.USER, ACCOUNT_TYPE.ADMINISTRATOR]), function(req, res) {  
    const userData = {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        organizationId: req.user.organizationId,
        userType: req.user.userType,
    }
    res.json({ success: true, user: userData });
});

router.get('/api/fetch_posts', function(req, res) {  
	post.find({ 'posterID': req.header.userID}).exec(function(err, posts) {
		if (posts != null) {
			const postData = {
				title: req.title,
				desc: req.desc,
				startTime: req.startTime,
				endTime: req.endTime,
			}
			res.json({success: true, posts: postData});
		} else {
			res.json({success: false, message: "Loading Activities Failed. Could not find any in database"})
		}
	});
});

router.post('/api/register', visitor(), function(req, res) {
    client.findOne({ 'clientSubdomain': req.body.organization}).exec().then(function(organization) {
        if (organization != null) {
            const orgId = organization._id.toString();
            var userData = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password,
                organisationId: orgId,
                userType: 3,
                active: true,
              }
            
            if (!validatePassword(req.body.password)) {
                res.json({ success: false, message: 'Password does not meet the validation requirements' });
            } else {
                account.create(userData, function (err, user) {
                if (err) {
                    if (err.code == 11000) {
                        res.json({ success: false, code: 11000, message: 'An account with this email already exists' });
                    } else {
                    res.json({ success: false, message: 'User could not be created ' + err });
                    }
                } else {
                    res.json({ success: true, message: 'User account successfully created' });
                }});
            }
        } else {
            res.json({ success: false, message: 'Registration failed. Organization could not be found' });
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
