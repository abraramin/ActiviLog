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


var passport = require('passport');

/* GET home page. */
router.get('/', ctrlHomePage.renderIndex);
/* User login */
router.get('/login', ctrlLogin.renderLogin);

module.exports = router;
