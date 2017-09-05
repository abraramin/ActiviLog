var express = require('express');
var path = require('path');
var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

var ctrlMain = require('../controllers/main');
var ctrlLogin = require('../controllers/login');
var ctrlRegister = require('../controllers/register');

router.get('/', ctrlMain.renderIndex);
router.get('/login', ctrlLogin.renderLoginPage);
router.get('/register', ctrlRegister.renderRegisterPage);

router.post('/fuckoff', ctrlMain.postOrganisation);
module.exports = router;
