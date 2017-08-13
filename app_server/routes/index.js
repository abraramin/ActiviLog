var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var ctrlHomePage = require('../controllers/home_page');
var ctrlLogin = require('../controllers/login');
var ctrlRegister = require('../controllers/register');


var passport = require('passport');

/* GET home page. */
router.get('/', ctrlHomePage.renderIndex);
/* User login */
router.get('/login', ctrlLogin.renderLogin);
/* User registration */
router.get('/register', ctrlRegister.renderRegister);

module.exports = router;
