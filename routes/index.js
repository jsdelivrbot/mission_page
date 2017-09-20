var express = require("express");
var router = express.Router();
var moment = require('moment');
var passport = require("passport");


var User = require("../models/user");
var Mission = require("../models/mission");
var Comment = require("../models/comment");

// var middleware = require("../middleware")

//INDEX
// List Mission 
router.get("/NewMission", function(req, res){
	Mission.find({status: "NEW"}, function(err, nM){
    		// console.log(nM);
        if(err){
            console.log("ERROR!");
        }else{
            res.render("NewMission", {nM: nM, moment:moment});
            // res.render("NewMission", {nM: nM, moment:moment});
        }
    });  

});

router.get("/OngoingMission", function(req, res){
	Mission.find({status: "ONGOING"}, function(err, ogM){
		// console.log(nM);
        if(err){
            console.log("ERROR!");
        }else{
            res.render("OngoingMission", {ogM: ogM, moment:moment});
        }
    });  

});

router.get("/CompletedMission", function(req, res){
	Mission.find({status: "COMPLETED"}, function(err, cM){
		// console.log(nM);
        if(err){
            console.log("ERROR!");
        }else{
            res.render("CompletedMission", {cM: cM, moment:moment});
        }
    });  

});

//USER AUTHENTICATION
// show register form
router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", function(req, res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render("signup");
            }
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/missions");
                });
    });
});

//show login
router.get("/login", function(req,res){
    res.render("login"); 
});

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/missions",
        failureRedirect: "/login"
    }), function(req,res){   
    
});

//logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/missions");
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;