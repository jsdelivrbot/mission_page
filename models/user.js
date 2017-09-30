var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

// var userSchema = new mongoose.Schema({
//     username: String,
//     password: String,
    
//     fullname: String,
//     icnumber: String,

//     nickname: String,
//     email: String,
//     handphone: String,


//     emergency_contact: String,
//     date_registered: {type: Date, default: Date.now()},
//     date_deactivation: Date,
//     active: String
// });

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
