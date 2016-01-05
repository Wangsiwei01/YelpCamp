var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "Cloud's Rest",
		image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
		description: "Etsy bushwick raw denim fixie lo-fi. Fixie knausgaard forage, seitan craft beer letterpress keytar brunch 90's paleo humblebrag waistcoat vinyl vice. Neutra migas forage austin, distillery small batch godard fixie venmo offal pitchfork cornhole PBR&B typewriter. Bicycle rights you probably haven't heard of them iPhone wayfarers."
	},
	{
		name: "Moon Glow",
		image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg",
		description: "Etsy bushwick raw denim fixie lo-fi. Fixie knausgaard forage, seitan craft beer letterpress keytar brunch 90's paleo humblebrag waistcoat vinyl vice. Neutra migas forage austin, distillery small batch godard fixie venmo offal pitchfork cornhole PBR&B typewriter. Bicycle rights you probably haven't heard of them iPhone wayfarers."
	},
	{
		name: "Desert Heat",
		image: "https://farm8.staticflickr.com/7503/15623542806_8058899c7d.jpg",
		description: "Etsy bushwick raw denim fixie lo-fi. Fixie knausgaard forage, seitan craft beer letterpress keytar brunch 90's paleo humblebrag waistcoat vinyl vice. Neutra migas forage austin, distillery small batch godard fixie venmo offal pitchfork cornhole PBR&B typewriter. Bicycle rights you probably haven't heard of them iPhone wayfarers."
	}
];

function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds");
		//add a few campgrounds
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
				if(err){
					console.log(err);
				} else {
					console.log("added a campground");
					//create a comment
					Comment.create(
						{
							text: "This place is great, but they need wifi!",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
							campground.comments.push(comment);
							campground.save();
							console.log("created new comment");
						}
						});
				}
			});
		});
	});
	//add a few comments
}
module.exports = seedDB;