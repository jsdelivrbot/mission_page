var mongoose = require("mongoose");

var missionSchema = new mongoose.Schema({
    title: String,
    image: {type: String, default: "https://12obtk2jn55z2ec8wk2hgcfw2-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Mission.png"},
    details: String,
    category: String,
    reward: String,

    status: String,
    location: String,

    author: {
   		id: {
   			type: mongoose.Schema.Types.ObjectId,
   			ref: "User"
   		},
   		username: String
   },

   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],

    date_text: String,

    date_created: {type: Date, default: Date.now}, 
    date_due: Date,

        date_accepted: Date,
        accepted_by: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User"
            },
            username: String
        },

        completed:{
          host_verify: Boolean,
          host_verify_date: Date,
          helper_verify: Boolean,
          helper_verify_date: Date,
          admin_verify: Boolean,
          admin_verify_date: Date
        },

        date_done: Date
});

module.exports = mongoose.model("Mission", missionSchema);
