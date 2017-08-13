/* GET log in page*/
module.exports.renderLogin = function(req, res, next) {
      res.render('login', { title: 'Login', user: req.user});
};
