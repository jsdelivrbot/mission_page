var express = require("express"),
    app = express();
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
        passport = require("passport"),
        LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    moment = require('moment');

// var async = require('async');

// APP CONFIG
mongoose.connect("mongodb://localhost/missions");
app.set('port', (process.env.PORT || 5000));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// ROUTES
var missionRoutes = require("./routes/missions")
// var commentRoutes = require("./routes/comments")
var indexRoutes = require("./routes/index")

// IMPORT MONGOOSE MODEL
var Mission = require("./models/mission");
var User = require("./models/user");
var Comment = require("./models/comment");

app.use("/", indexRoutes);
app.use("/missions", missionRoutes);


// Mission.find().remove().exec(function(err, data) {
//   // data will equal the number of docs removed, not the document itself
// });

// RESTFUL ROUTES
app.get("/", function(req, res){
    res.redirect("/missions");
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
