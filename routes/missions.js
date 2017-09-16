var express = require("express");
var router = express.Router();
var moment = require('moment');
var async = require('async');

var Mission = require("../models/mission");
var Comment = require("../models/comment");

// var middleware = require("../middleware") //auto require index.js inside the dir 

var missionCategories = ["Buy and Deliver", "Delivery Only", "Sell for me!", "Check something for me!", "Answer my questions!", "Others"];
var status_list = ["NEW", "ONGOING", "COMPLETED"];

//INDEX
router.get("/",function(req,res){
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
     	res.render("index", {missions: missions, nM: nM, ogM: ogM, cM: cM, moment:moment});
   });


});

// router.get("/", function(req, res){

// 	// missions.$where({status: "NEW"})
// 	// var newMission = Mission.find().where({status: 'NEW'})
// 	// var missions = Mission.find({}, function(err, value){
// 	// 		return(value);
// 	// });  	
// 	// var nM = Mission.find({status: "NEW"}, function(err, value){
// 	// 		return(value);
// 	// }); 
// 	// var ogM = Mission.find({status: "ONGOING"}, function(err, value){
// 	// 		return(value);
// 	// }); 	
// 	// var cM = Mission.find({status: "COMPLETED"}, function(err, value){
// 	// 		return(value);
// 	// }); 


// 	// res.render("index", {missions: missions, nM: nM, ogM: ogM, cM: cM, moment:moment});

//     Mission.find({}, function(err, missions){
// 		// console.log(nM);
//         if(err){
//             console.log("ERROR!");
//         }else{
//         	res.render("index", {missions: missions, moment:moment});
//         	// res.render("index", {missions: missions, nM: nM, ogM: ogM, cM: cM, moment:moment});
//     	}
//     });  
// });

// NEW ROUTE
router.get("/new", function(req, res){
    res.render("new", {missionCategories: missionCategories});
})

//CREATE ROUTE
router.post("/", function(req, res){
    //create blog
    req.body.mission.details = req.sanitize(req.body.mission.details);


    // req.body.mission.image = "https://12obtk2jn55z2ec8wk2hgcfw2-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Mission.png";
    req.body.mission.status = "NEW";
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

// UPDATE ROUTE - particular mission
router.put("/:id", function(req, res){
    Mission.findByIdAndUpdate(req.params.id, req.body.mission, function(err, foundMission){
          if(err){
              res.redirect("back");
          } else{
              res.redirect("/missions/" + req.params.id);
          }
    })
});



module.exports = router;