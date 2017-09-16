var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

// var userSchema = new mongoose.Schema({
// 	username: String,
// 	password: String
// });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    
    firstname: String,
    lastname: String,
    nickname: String,
    email: String,
    handphone: String,
    emergency_contact: String,

    date_registered: Date,
    date_deactivation: Date,
    active: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
