const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var enumColor = {
  values: ['Red', 'Blue', 'Green', 'Magenta', 'Yellow', 'Grey', 'Cyan', 'LightCoral', 'LightSkyBlue', 'MediumPurple', 'OliveDrab', 'SaddleBrown', 'Violet'],
  message: '{VALUE} is not a selectable color.'
}

var activitySchema = new Schema
({

    _id: Schema.Types.ObjectId,

    title: {
      type: String,
      require:true
    },

    description: {
      type: String,
      require:true
    },

    organisationId: {
      type: String,
      require:true
    },

    color:{type:String, enum:enumColor},

    active:{type:Boolean, require:true},

},{
  timestamps: true,
});

activitySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Activities', activitySchema);
