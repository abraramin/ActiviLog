const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

var account = require('../models/account_model');
var orgname;

/* GET home page */
module.exports.renderIndex = function(req, res){
	res.sendFile(path.join(__dirname,'../../public/index.html'));
};

/* POST request for homepage. Save org name and render registration page.*/
module.exports.postOrganisation = function(req, res){
	orgname = req.body.orgName;
	res.sendFile(path.join(__dirname,'../../public/register.html'));
	//res.redirect('/org/' + orgname);
};

/*List all users by organisation.*/
module.exports.postUserList = function(req, res){
	account.register(new Account(
		{
			username:req.body.email,
			email:req.body.email,
			full_name:req.body.fullname,
			organisation:orgname,
			date_joined:new Date(),
		}),
		req.body.password,
		function(err, account)
		{
			if(err){
				console.log("Error! Posting user list.")
				return res.render('Oops');
			}
			passport.authenticate('local')(req, res, function(){
				res.redirect('/');
			});
		}
	);
};

	
