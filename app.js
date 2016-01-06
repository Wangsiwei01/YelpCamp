var express 			= require("express"),
		app 					= express(),
		bodyParser 		= require("body-parser"),
		mongoose 			= require("mongoose");
		methodOverride = require("method-override"),
		Campground 		= require("./models/campground"),
		Comment 			= require("./models/comment"),
		passport			= require("passport"),
		LocalStrategy = require("passport-local"),
		User					= require("./models/user"),
		seedDB 				= require("./seeds");


var commentRoutes 		= require("./routes/comments"),
		campgroundRoutes 	= require("./routes/campgrounds"),
		indexRoutes 			= require("./routes/index");


mongoose.connect(process.env.MONGOLAB_URI ||"mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//seed the db
//seedDB();

///---- PASSPORT CONFIG ----///
app.use(require("express-session")({
	secret: "I'm seriously so tired",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

///---- REQUIRE ROUTES ----///
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

var port = Number(process.env.PORT || 3000);

app.listen(port, function(){
	console.log("App is running, baby!");
})