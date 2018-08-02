var db = require('../db');

exports.create = function(placeCred, cb) {
  db.get().query('INSERT INTO meetmeapp.place SET ?', placeCred, function(err) {
    if (err) return cb(err);
    cb();
  });
};

exports.getPlaceByCity = function(city, cb) {
  db.get().query('SELECT * FROM meetmeapp.place WHERE city=?', city, function(err, rows) {
    cb(err, rows);
  });
};
