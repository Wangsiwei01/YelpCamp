var express = require("express"),
		app = express(),
		bodyParser = require("body-parser"),
		mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//Initial (not permanent) Schema Setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 		{
// 			name: "Smith Rock", 
// 			image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
// 			description: "This is a huge rock of smithness. Awww yeaaaaa."
// 		}, function(err, campground){
// 			if(err){
// 				console.log(err);
// 			} else {
// 				console.log("Newly created campground");
// 				console.log(campground);
// 			}
// 		});


app.get("/", function(req, res){
	res.render("landing");
});

// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("index", {campgrounds:allCampgrounds});
		}
	})
});

// NEW route - show form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

//CREATE route - add new campground to database
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	//create new campground and save to db
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
});

// SHOW route - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find campground with provided id
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			res.render("show", {campground: foundCampground});
		}
	});
});



app.listen(3000, function(){
	console.log("App running on 3000, baby!");
})