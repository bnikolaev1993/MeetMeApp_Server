var db = require('../db');

exports.create = function(placeCred, cb) {
  db.get().query('INSERT INTO meetmeapp.place SET ?', placeCred, function(err) {
    if (err) return cb(err);
    cb();
  });
};
