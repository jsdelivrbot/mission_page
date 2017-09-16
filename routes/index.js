var express = require("express");
var router = express.Router();
var moment = require('moment');

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


module.exports = router;