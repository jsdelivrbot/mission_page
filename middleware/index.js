// all the middleware goes here
var Mission = require("../models/mission");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.render("landing", {click: true});
};

middlewareObj.isLoggedInLanding = function(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.render("landing", {click: true});
};


middlewareObj.checkMissionOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Mission.findById(req.params.id, function(err, foundMission){
			if(err){
				res.redirect("back");
			}else{
				// does user own the campground // if not, redirect
				if(foundMission.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}

}

 middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				res.redirect("back");
			}else{
				// does user own the comment // if not, redirect
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}

}

module.exports = middlewareObj;
