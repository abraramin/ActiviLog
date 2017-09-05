var express = require('express');
var path = require('path');
var passport = require('passport');
var Account = require('../models/account_model');
var router = express.Router();

var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.renderIndex);

router.post('/register', ctrlMain.postOrganisation);
router.post('/access', ctrlMain.postUserList);

module.exports = router;
