var db = require('../db');

exports.addMessage = function(msg, cb) {
  db.get().query('INSERT INTO meetmeapp.message SET ?', msg, function(err) {
    cb(err);
  });
};

exports.getHistory = function(placeID, cb) {
  db.get().query('SELECT nickname, message, date FROM meetmeapp.message WHERE place_id=? ORDER BY date ASC LIMIT 5', placeID, function(err, rows) {
    if (err) return cb(err, null);
    return cb(err, rows);
  });
};
