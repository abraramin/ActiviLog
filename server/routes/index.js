var express = require('express');
var path = require('path');
var passport = require('passport');
var Account = require('../models/account_model');
var router = express.Router();

var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.renderIndex);
router.get('/access', ctrlMain.renderAccess);

router.post('/register', ctrlMain.postOrganisation);
router.post('/access', ctrlMain.postUserList);

router.get('/:org/:user/control-panel', ctrlMain.getUserListView)

router.get('/logout', function(req, res) {
      req.logout();
          res.redirect('/');
});

/* delete simple */
router.get('/delete/:user', ctrlMain.deletePerson);

module.exports = router;
