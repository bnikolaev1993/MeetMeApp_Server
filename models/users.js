var db = require('../db');

exports.create = function(userCred, userDet, cb) {
  db.get().query('INSERT INTO meetmeapp.user SET ?', userCred, function(err) {
    if (err) return cb(err);
    db.get().query('SELECT id FROM meetmeapp.user WHERE username=? LIMIT 1', userCred.username, function(err, rows) {
      if (err) return cb(err);
      console.log("ID: " + rows[0].id);
      userDet.user_id = rows[0].id;
      db.get().query('INSERT INTO meetmeapp.userDetails SET ?', userDet, function(err) {
        if (err) {
          db.get().query('DELETE FROM meetmeapp.user WHERE id = "' + rows[0].id + '"');
          return cb(err);
        }
        return cb(err);
      });
    });
  });
};

exports.login = function(userCred, cb) {
  db.get().query(
    'SELECT id FROM meetmeapp.user WHERE username="' + userCred.username + '" AND password="' + userCred.password + '" LIMIT 1',
    function(err, rows) {
      if (err) return cb(err, null);
      if (!rows[0]) return cb("Invalid Login! No values", null);
      db.get().query('SELECT user.id, user.username, userDetails.name, userDetails.surname, userDetails.gender, userDetails.dob ' +
        'FROM meetmeapp.user INNER JOIN userDetails ON user.id = userDetails.user_id ' +
        'WHERE user.id = ?', rows[0].id, function(err, rows1) {
          if (err) return cb(err, null);
          db.get().query('SELECT placeManager.*, place.* FROM meetmeapp.placeManager ' +
          'INNER JOIN place ON placeManager.place_id = place.id ' +
          'WHERE placeManager.participant_id = ?', rows1[0].id, function(err, place) {
            var data = [];
            data.push({
              "User": rows1[0],
              "Place": place
            });
            return cb(err, data[0]);
          });
        });
    });
};

exports.selectAll = function (cb) {
  db.get().query('SELECT * FROM meetmeapp.user', function(err, rows) {
    return cb(err, rows);
  });
};
