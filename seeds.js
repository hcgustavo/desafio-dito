var mongoose = require('mongoose');
var DEvent = require('./models/event.js');

var evTypes = ['login', 'buy', 'rent', 'cancel', 'clickeditem', 'watchedmovie', 'watchedseries', 'watchedconcert', 'commented', 'rated', 'searchedmovie',
               'searchedseries', 'searchedconcert'];
var events = [];


function createRandomEvent() {
  var ev = evTypes[Math.floor(Math.random() * evTypes.length)];
  var ts = new Date().toISOString();
  events.push({dEvent: ev, timestamp: ts});
}

function seedDB(numEvents) {
  for(let i = 0; i < numEvents; i++) {
    createRandomEvent();
  }

  DEvent.remove({}, function(err) {
    if(err) {
      console.log(err);
      return;
    }
    
    events.forEach(function(ev, index) {
      DEvent.create(ev, function(err, newEvent) {
        if(err) {
          console.log(err);
        }

      });
    });
  });

}

module.exports = seedDB;
