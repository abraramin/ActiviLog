var path = require('path');

/* GET home page */
module.exports.renderIndex = function(req, res){
	res.sendFile(path.join(__dirname,'../../client/index.html'));
};

module.exports.postOrganisation = function(req, res){
	console.log("Hello World");
};
