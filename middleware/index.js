var Campground 		= require("../models/campground");
var Comment 			= require("../models/comment");
//all middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Sorry, that campground could not be found");
				res.redirect("back");
			} else {
				//does user own campground
				if(foundCampground.author.id.equals(req.user._id)){		
					next();
			} else {
				req.flash("error", "You don't have permission to do that");
				res.redirect("back");
			}
		}
		});
	} else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwner = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Sorry, that comment could not be found");
				res.redirect("back");
			} else {
				//does user own comment
				if(foundComment.author.id.equals(req.user._id)){		
					next();
			} else {
				req.flash("error", "You don't have permission to do that");
				res.redirect("back");
			}
		}
		});
	} else {
		req.flash("error", "You must be logged in to do that");
		res.redirect("back");
	}
};


middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You must be logged in to do that");
	res.redirect("/login");
};


module.exports = middlewareObj;