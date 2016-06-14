/**
 * GET /
 * Home page.
 */

var index = function(req, res) {
  var user = null;
  console.log(req.user);
  if(req.user){
	  user = req.user;
  }
  else{
	  user=null;
  }
  res.render('home', {
	user: user,
	picture : (user===null || user===undefined)?null:user.gravatar(20),
	docTitle: 'MyList',
    projectName: 'MyListProject',
    socialSectionHeaderText: "Happenings in Hollywood",
    socialSectionParaText : "Never miss a beat when it comes to the lastest happenings in tinsel town. From gossips to event ; from releases to announcement ; always remain on top of the news with @thncon"
  });
};

module.exports = index;