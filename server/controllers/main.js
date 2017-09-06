require('../models/db');

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');


var Account = require('../models/account_model');
var orgname;

/* GET home page */
module.exports.renderIndex = function(req, res){
	res.sendFile(path.join(__dirname,'../../public/index.html'));
};


/* POST home page */
module.exports.renderIndex = function(req, res){
	res.render('access', {user: req.account});
};

/* GET Access page*/
module.exports.renderAccess = function(req, res){
	//res.render('access', {user: req.account});
	res.render('access', {user : req.account});
};


module.exports.getUserListView = function(req, res){
	console.log('test*-*-*');
	console.log(req.user);
  Account.find().exec(
        function(err, simpleData){
          if(err){
						console.log(err);
						res.render('/');
						return;
          }
	  		else{
					console.log('find complete');
	    		res.render('control_panel',{'title':'Control Panel', 'people':simpleData, 'user':req.user});
				}
			}
  );
};



/* POST request for homepage. Save org name and render registration page.*/
module.exports.postOrganisation = function(req, res){
	orgname = req.body.orgName;
	res.sendFile(path.join(__dirname,'../../public/register.html'));
	//res.redirect('/org/' + orgname);
};



/*List all users by organisation.*/
module.exports.postUserList = function(req, res, next){
	Account.register(new Account({
			username:req.body.username,
			email:req.body.email,
			full_name:req.body.full_name,
			organisation: orgname,
			date_joined:new Date(),
		}),
		req.body.password,
		function(err, account)
		{
			if(err)
			{
				console.log("Error! Posting user list.")
				console.log(err);
				res.redirect('/');
				return;
			}
			console.log('[X] SAVED:\n' + account);
			var uname = account.username.split('@')[0];

			passport.authenticate('local')(req, res, function () {
				res.redirect('/'+account.organisation+'/'+uname+'/control-panel');
			});
		});
};



//Delete a person
module.exports.deletePerson = function(req, res) {
  if(req.user && req.user.username == req.params.username) {
    Person.remove({
      username: req.params.username
    }, function(err) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('error', {
          message: err.message,
          error: err
        });
      } else {
        console.log(req.param.id, ' removed');
        res.redirect('/');
      }
    });
  } else {
    console.log("You can only delete your own profile.")
  }
};
