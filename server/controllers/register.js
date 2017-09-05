var path = require('path');
/* GET register page */
module.exports.renderRegisterPage = function(req, res, next){
	//res.render('register', {title:'Register'});
	res.sendFile(path.join(__dirname,'../../client/register.html'));
};
