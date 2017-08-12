/* GET about page. */
module.exports.renderAbout = function(req, res, next) {
  res.render('about', {title: 'Clinicalog | About', user: req.user});
};
