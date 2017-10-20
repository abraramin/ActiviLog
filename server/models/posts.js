const mongoose = require('mongoose');
const mongooseAggregatePaginate = require('mongoose-aggregate-paginate');

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
      type: Schema.Types.ObjectId
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
      type: Schema.Types.ObjectId,
      require:true
    },

    clientId: {
      type: Schema.Types.ObjectId,
      require:true
    },

    active:{type:Boolean, require:true},

},{
  timestamps: true
});

postSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model('Posts', postSchema);
