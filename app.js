var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var DEvent = require('./models/event.js');
var seedDB = require('./seeds.js');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost/desafio_dito");

//seedDB(10);


/////////////////
// ROUTES
////////////////

/* POST */
app.post('/api/event', function(req, res) {
  var eventName = req.body.eventName.toLowerCase();
  var timestamp = req.body.timestamp;
  var dEvent = {dEvent: eventName, timestamp: timestamp};
  DEvent.create(dEvent, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Event saved: " + newlyCreated);
    }
  });
});

app.get('/api/event/:str', function(req, res) {
  DEvent.find({"dEvent": new RegExp('^' + req.params.str)}).select('dEvent').exec(function(err, devents) {
    if(err) {
      console.log(err);
    }
    else {
      res.status(200).json(devents);
    }
  });
});

app.listen(8080, "localhost", function() {
  console.log("Server is running... ");
});
