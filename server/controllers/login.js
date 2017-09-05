var path = require('path');

/* GET login page */
module.exports.renderLoginPage = function(req, res, next){
	res.sendFile(path.join(__dirname,'../../client/login.html'));
	//res.render('login', {title:'Log In'});
}
