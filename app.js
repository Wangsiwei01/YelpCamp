var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
		{name: "Smith Rock", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
		{name: "Honeyman State Park", image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg"},
		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
		{name: "Smith Rock", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
		{name: "Honeyman State Park", image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg"},
		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8002/7299820870_e78782c078.jpg"},
		{name: "Smith Rock", image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg"},
		{name: "Honeyman State Park", image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg"}
	]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds});
});


app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});


app.listen(3000, function(){
	console.log("App running on 3000, baby!");
})