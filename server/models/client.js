var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var client = new Schema({
    "_id": Number,
    "clientName": String,
    "clientDescription": String,
    "clientPlan": Number,
    "clientTrial": Boolean,
    "clientTrialStart": String,
    "clientTrialEnd": String,
    "clientSubdomain": String,
    "createdDate": String,
    "clientActive": Number,
});

module.exports = mongoose.model('Client', client);