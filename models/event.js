var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  dEvent: String,
  timestamp: String
});

module.exports = mongoose.model("DEvent", eventSchema);
