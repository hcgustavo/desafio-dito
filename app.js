let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let DEvent = require('./models/event.js');
let seedDB = require('./seeds.js');

let port = process.env.PORT || 3000;

let app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.MONGODB_URI);

//seedDB(100000);


/////////////////
// ROUTES
////////////////

/* POST - armazena evento no banco de dados */
app.post('/api/event/register', function(req, res) {
  let eventName = req.body.eventName.toLowerCase();
  let timestamp = req.body.timestamp;
  let dEvent = {dEvent: eventName, timestamp: timestamp};
  DEvent.create(dEvent, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Event saved: " + newlyCreated);
    }
  });
});

/* GET - seleciona eventos cujo nome começa com uma determina string */
app.get('/api/event/search/:str', function(req, res) {
  DEvent.distinct("dEvent", {dEvent: new RegExp('^' + req.params.str)}, function(err, results) {
    if(err) {
      res.status(400).json(err);
    }
    else {
      res.status(200).json(results);
    }
  });
});

app.listen(port, function() {
  console.log("Server is running... ");
});
