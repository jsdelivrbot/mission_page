var bodyParser = require("body-parser"),
mongoose = require("mongoose"),
methodOverride = require("method-override"),
expressSanitizer = require("express-sanitizer"),
express = require("express"),
app = express();

var async = require('async');
var moment = require('moment');
// moment().format();

// APP CONFIG
mongoose.connect("mongodb://localhost/missions");
app.set('port', (process.env.PORT || 5000));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));


// MONGOOSE/MODEL CONFIG
var missionSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://12obtk2jn55z2ec8wk2hgcfw2-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Mission.png"},
    details: String,
    category: String,
    reward: String,

    status: String,
    location: String,

    author: String,

    date_text: String,

    date_created: {type: Date, default: Date.now}, 
    date_due: Date,
    date_accepted: Date,
    date_done: Date
});

var Mission = mongoose.model("Mission", missionSchema);

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    handphone: String,

    date_registered: Date,
    date_deactivation: Date,

    emergency_contact: String,
    active: String

});

var User = mongoose.model("User", missionSchema);


// Mission.find().remove().exec(function(err, data) {
//   // data will equal the number of docs removed, not the document itself
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/missions");
});

app.get("/missions/NewMission", function(req, res){
	Mission.find({status: "NEW"}, function(err, nM){
    		// console.log(nM);
	        if(err){
	            console.log("ERROR!");
	        }else{
	 

            res.render("NewMission", {nM: nM, moment:moment});
        }
    });  

});

app.get("/missions/OngoingMission", function(req, res){
	Mission.find({status: "ONGOING"}, function(err, ogM){
    		// console.log(nM);
	        if(err){
	            console.log("ERROR!");
	        }else{
	 

            res.render("OngoingMission", {ogM: ogM, moment:moment});
        }
    });  

});

app.get("/missions/CompletedMission", function(req, res){
	Mission.find({status: "COMPLETED"}, function(err, cM){
    		// console.log(nM);
	        if(err){
	            console.log("ERROR!");
	        }else{
	 

            res.render("CompletedMission", {cM: cM, moment:moment});
        }
    });  

});


//INDEX
app.get("/missions", function(req, res){

	// missions.$where({status: "NEW"})
	// var newMission = Mission.find().where({status: 'NEW'});
	
		var nM = Mission.find({status: "NEW"}, function(err, value){
    			return(value);
    	})  
    	var oG = Mission.find({status: "ONGOING"}, function(err, value){
    			return(value);
    	})  
    

    Mission.find({}, function(err, missions){
    		// console.log(nM);
	        if(err){
	            console.log("ERROR!");
	        }else{
	 

            res.render("index", {missions: missions, nM: nM, oG: oG, moment:moment});
        }
    });  
});

// NEW ROUTE
app.get("/missions/new", function(req, res){

    var missionCategories = ["Buy and Deliver", "Delivery Only", "Sell for me!", "Check something for me!", "Answer my questions!", "Others"];

    res.render("new", {missionCategories: missionCategories});
})


//CREATE ROUTE
app.post("/missions", function(req, res){
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


// SHOW ROUTE
app.get("/missions/:id", function(req, res){
    Mission.findById(req.params.id, function(err, foundMission){
          if(err){
              res.redirect("/missions");
          } else{
              res.render("show", {mission: foundMission});
          }
    })
});


// EDIT ROUTE
// app.get("/blogs/:id/edit", function(req, res){
//     Blog.findById(req.params.id, function(err, foundBlog){
//         if(err){
//             res.redirect("/blogs");
//         }else{
//             res.render("edit", {blog: foundBlog});
//         }
//     });
//     // res.render("edit");
// })

// UPDATE ROUTE
// app.put("/blogs/:id", function(req,res){
//     req.body.blog.body = req.sanitize(req.body.blog.body);
//     Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
//         if(err){
//             res.redirect("/blogs");
//         }else{
//             res.redirect("/blogs/" + req.params.id);
//         }
//     })
//     // res.send("UPDATE ROUTE!");
// })


// DELETE ROUTE
// app.delete("/blogs/:id", function(req,res){
//     Blog.findByIdAndRemove(req.params.id, function(err){
//         if(err){
//             res.redirect("/blogs");
//         }else{
//             res.redirect("/blogs");
//         }
//     })
//     // res.send("YOU HAVE REACHED THE DESTROY ROUTE");
// })

app.listen(app.get('port'), function(){
    console.log("server is running on port ", app.get('port'));
    
});

// app.listen(3001, function(){
//     console.log("server is running on port ", 3001);
    
// });
