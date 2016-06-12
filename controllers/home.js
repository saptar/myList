/**
 * GET /
 * Home page.
 */
var index = function(req, res) {
  res.render('home', {
	docTitle: 'MyList',
    projectName: 'MyListProject',
    socialSectionHeaderText: "Happenings in Hollywood",
    socialSectionParaText : "Never miss a beat when it comes to the lastest happenings in tinsel town. From gossips to event ; from releases to announcement ; always remain on top of the news with @thncon"
  });
};

module.exports = index;