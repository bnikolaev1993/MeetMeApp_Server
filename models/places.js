var db = require('../db');

exports.create = function(placeCred, cb) {
  db.get().query('INSERT INTO meetmeapp.place SET ?', placeCred, function(err) {
    if (err) return cb(err);
    db.get().query('SELECT id FROM meetmeapp.place WHERE name = "' + placeCred.name +
    '" AND placemark = "' + placeCred.placemark + '" AND user_id = "' + placeCred.user_id + '" LIMIT 1',
    function(err, rows) {
      if (err) return cb(err);
      console.log("Place ID: " + rows[0].id);
      cb(err, rows[0]);
    });
  });
};

exports.getPlaceByCity = function(city, cb) {
  db.get().query('SELECT * FROM meetmeapp.place WHERE city=?', city, function(err, rows) {
    cb(err, rows);
  });
};

exports.joinPlace = function(credID, cb) {
  db.get().query('INSERT INTO meetmeapp.placeManager SET ?', credID, function(err) {
    cb(err);
  });
};

exports.leavePlace = function(credID, cb) {
  db.get().query('DELETE FROM meetmeapp.placeManager WHERE place_id = "' + credID.place_id +
  '" AND participant_id = "' + credID.participant_id + '"', function(err) {
    cb(err);
  });
};

exports.deletePlace = function(credID, cb) {
  db.get().query('DELETE FROM meetmeapp.place WHERE id = "' + credID.place_id +
  '" AND user_id = "' + credID.user_id + '"', function(err) {
    cb(err);
  });
};

exports.getPlaceById = function(place_id, cb) {
  db.get().query('SELECT * FROM meetmeapp.place WHERE id = ?',
    place_id, function(err, rows) {
    if (err) return cb(err, nil);
    cb(err, rows);
  });
};
