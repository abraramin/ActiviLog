const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');

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
	console.log("tada");
};
