var Places = require('../models/places');

exports.create = function (req, res) {
  console.log("Place is creating…");
  var placeCred = {
    user_id: req.body.user_id,
    name: req.body.name,
    placemark: req.body.placemark,
    city: req.body.city,
    privacy: req.body.privacy,
    lat: req.body.lat,
    long: req.body.long,
    description: req.body.description
  };
  console.log("Lat: " + placeCred.lat);
  console.log("Long: " + placeCred.long);
  console.log("City: " + placeCred.city);
  Places.create(placeCred, function (err, rows) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Saving place failed!' });
    }
    res.send(rows);
  });
  console.log("Place created!");
};

exports.getPlaceByCity = function (req, res) {
  console.log("Places are fetching…");
  var city = req.params.city;
  console.log("City: " + city);
  Places.getPlaceByCity(city, function (err, rows) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'No city' });
    }
    res.send(rows);
  });
  console.log("Places fetched!");
};

exports.joinPlace = function(req, res) {
  var credID = {
    place_id: req.body.place_id,
    participant_id: req.body.user_id
  };
  Places.joinPlace(credID, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Joining place failed!' });
    }
    res.sendStatus(200);
  });
};

exports.leavePlace = function(req, res) {
  var credID = {
    place_id: req.body.place_id,
    participant_id: req.body.user_id
  };
  Places.leavePlace(credID, function(err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Leaving place failed!' });
    }
    res.sendStatus(200);
  });
};

exports.getPlaceById = function(req, res) {
  var place_id = req.params.place_id;
  Places.joinPlace(place_id, function(err, rows) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Getting place failed!' });
    }
    res.send(rows);
  });
};
