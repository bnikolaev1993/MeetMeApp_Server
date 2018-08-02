var express = require('express');
var bodyParser = require('body-parser');
var mySQL = require('mysql');
var db = require('./db');
var usersController = require('./controllers/users');
var placesController = require('./controllers/places');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/artists/:id', function(req, res) {
  var artist = artists.find(function(artist) {
    return artist.id === Number(req.params.id);
  });
  res.send(artist);
});

app.post('/addUser', usersController.create);
app.post('/addPlace', placesController.create);
app.get('/users', usersController.selectAll);
app.post('/login', usersController.login);
app.get('/getPlaceByCity/:city', placesController.getPlaceByCity);

db.connect(function(err) {
  if (err) return console.log(err);
  console.log("Database is Connected!");
  app.listen(3012, function() {
    console.log('Server has been Started!');
  });
});
