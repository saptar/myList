/**
 * GET /
 * Home page.
 */
var index = function(req, res) {
  res.render('home', {
	docTitle: 'MyList',
    projectName: 'MyListProject'
  });
};

module.exports = index;