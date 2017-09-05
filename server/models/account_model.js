const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const passportLocalValidator = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var accountSchema = new Schema
({
    username: {
      type: String,
      require:true,
    },

    email: {
      type: String,
      require:true,
      validate: {
        validator: function(v){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: '{VALUE} is not a valid email address.'
      },
    },

    full_name: {
      type: String,
      require:true,
    },

    password:{
      type:String,
      require:true,
    },

    organisation:{
      type:String,
      require: true,
    },

    date_joined:{
      type:Date,
      require: true,
    }
});

accountSchema.plugin(passportLocalValidator);
accountSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Account', accountSchema);
