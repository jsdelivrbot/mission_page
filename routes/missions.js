var express = require("express");
var router = express.Router();
var moment = require('moment');
var async = require('async');

var Mission = require("../models/mission");
var Comment = require("../models/comment");

var middleware = require("../middleware") //auto require index.js inside the dir 


// PARAMETERs
var missionCategories = ["Buy and Deliver", "Delivery Only", "Sell for me!", "Check something for me!", "Answer my questions!", "Others"];
var status_list = ["NEW", "ONGOING", "COMPLETED"];


//INDEX
router.get("/accepted", middleware.isLoggedInLanding, function(req,res){
  function findUser(obj) { 
    return obj.accepted_by.username == req.user.username;
  }
  var header = "Accepted Mission";

  Mission.find({status:"ONGOING"}).sort('-date_created').exec(function(err,ogM){
      console.log(ogM);
      var G = [];
      ogM.forEach(function(og){
        // console.log(og);
        if(og.accepted_by.username == req.user.username){
          G.push(og);
        }
      })
      res.render("index", {nM: G, moment:moment, header: header});

  });     
     	
});

router.get("/", middleware.isLoggedInLanding, function(req,res){
  var header = "New Mission";
   var nM;
   var ogM;
   var cM;
   async.series([function(callback){
       Mission.find({status:"NEW"}).sort('-date_created').exec(function(err,allnM){
           if(err) return callback(err);
           nM = allnM;
           callback(null,allnM);
       })
   },function(callback){
       Mission.find({status:"ONGOING"}).sort('-date_created').exec(function(err,allogM){
           if(err) return callback(err);
           ogM = allogM;
           callback(null,allogM);
       })
   },function(callback){
    Mission.find({status:"COMPLETED"}).sort('-date_created').exec(function(err,allcM){
           if(err) return callback(err);
           cM = allcM;
           callback(null,allcM);
       })

   }
   ],function(err){
      var missions = cM;
      res.render("index", {missions: missions, nM: nM, ogM: ogM, cM: cM, moment:moment, header: header});
   });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("new", {missionCategories: missionCategories});
})

//CREATE ROUTE
router.post("/", function(req, res){
    //create blog
    req.body.mission.details = req.sanitize(req.body.mission.details);
	var author = {
      	id: req.user._id,
      	username: req.user.username
	};
	req.body.mission.status = "NEW";


	var newMission = req.body.mission;
	newMission["author"] = author;
	// newMission.items.push(req.body.mission);

	console.log(newMission);
    // req.body.mission.image = "https://12obtk2jn55z2ec8wk2hgcfw2-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Mission.png";
    
    Mission.create(req.body.mission, function(err, newMission){
        if(err){
            res.render("new");
        } else {
            //then, redirect to index
            res.redirect("/missions");  
        }
    });
});

// SHOW particular mission
router.get("/:id", function(req, res){
    Mission.findById(req.params.id, function(err, foundMission){
          if(err){
              res.redirect("back");
          } else{
              res.render("show", {mission: foundMission});
          }
    })
});

// EDIT ROUTE - show FORM
router.get("/:id/edit", function(req, res){
    Mission.findById(req.params.id, function(err, foundMission){
          if(err){
              res.redirect("back");
          } else{
              res.render("missions/edit", {mission: foundMission, status_list:status_list, missionCategories: missionCategories});
          }
    })
});

// UPDATE ROUTE - particular mission //need authorisation to prevent normal user to do postman and change current "accepted by" user
router.put("/:id", function(req, res){
    // var accMission = req.body.mission;
    // accMission.date_accepted = new Date();
    // var acc_by = {
    //     id: req.user._id,
    //     username: req.user.username
    // };
    // accMission.accepted_by = acc_by;

    Mission.findByIdAndUpdate(req.params.id, req.body.mission, function(err, foundMission){
          if(err){
              res.redirect("back");
          } else{
              res.redirect("/missions/" + req.params.id);
          }
    })
});

router.delete("/:id", function(req, res){
    Mission.findByIdAndRemove(req.params.id, function(err){
          if(err){
              res.redirect("/missions");
          } else{
              res.redirect("/missions");
          }
    })
});




module.exports = router;