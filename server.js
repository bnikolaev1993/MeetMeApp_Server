var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var mySQL = require('mysql');
var db = require('./db');
var io = require('./controllers/socket');
var usersController = require('./controllers/users');
var placesController = require('./controllers/places');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/addUser', usersController.create);
app.post('/addPlace', placesController.create);
app.get('/users', usersController.selectAll);
app.post('/login', usersController.login);
app.get('/getPlaceByCity/:city', placesController.getPlaceByCity);
app.post('/joinPlace', placesController.joinPlace);
app.post('/leavePlace', placesController.leavePlace);
app.post('/deletePlace', placesController.deletePlace);
app.get('/getPlaceById/:place_id', placesController.getPlaceById);

db.connect(function(err) {
  if (err) return console.log(err);
  console.log("Database is Connected!");
  http.listen(3012, function() {
    console.log('Server has been Started!');
    io.listen(http);
  });
});
