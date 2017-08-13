/* GET home page. */
module.exports.renderIndex = function(req, res, next) {
  res.render('index', { title: 'Clinicalog', user: req.user});
};
