const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

var postSchema = new Schema
({
    title: {
      type: String,
      require:true
    },

    description: {
      type: String,
      require:true
    },

    activity: {
      type: String,
    },

    discipline: {
      type: String,
      require:true
    },

    location:{type:String},

    startTime:{type:Date, require:true},

    endTime:{type:Date, require:true},

    notes: {
      type: String,
    },

    userId: {
      type: String,
      require:true
    },

    clientId: {
      type: String,
      require:true
    },

    active:{type:Boolean, require:true},

},{
  timestamps: true
});

postSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Posts', postSchema);
