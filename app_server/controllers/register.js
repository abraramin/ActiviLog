/* GET register page. */
module.exports.renderRegister = function(req, res, next) {
    res.render('register', {title: 'Register', user: req.user});
};
