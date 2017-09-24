var express         = require("express"),
    app             = express();
    bodyParser      = require("body-parser"),
    mongoose            = require("mongoose"),
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer"),
    moment              = require('moment'),
    flash               = require("connect-flash");

// var async = require('async');
// IMPORT MONGOOSE MODEL
var Mission     = require("./models/mission");
var User        = require("./models/user");
var Comment     = require("./models/comment");


// APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/missions"
mongoose.connect(url);
app.set('port', (process.env.PORT || 5000));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "hello liv",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});

// ROUTES
var missionRoutes = require("./routes/missions")
var indexRoutes = require("./routes/index")
// var commentRoutes = require("./routes/comments")
app.use("/", indexRoutes);
app.use("/missions", missionRoutes);


// RESTFUL ROUTES
app.get("/", function(req, res){
    res.render("landing");
});

app.listen(app.get('port'), function(){
    console.log("Mission Server is running on port ", app.get('port'));
});
