var db = require('../db');

exports.create = function(userCred, userDet, cb) {
  db.get().query('INSERT INTO meetmeapp.user SET ?', userCred, function(err) {
    if (err) return cb(err);
    db.get().query('SELECT id FROM meetmeapp.user WHERE username=? LIMIT 1', userCred.username, function(err, rows) {
      if (err) return cb(err);
      console.log("ID: " + rows[0].id);
      userDet.user_id = rows[0].id;
      db.get().query('INSERT INTO meetmeapp.userDetails SET ?', userDet, function(err) {
        return cb(err);
      });
    });
  });
};

exports.login = function(userCred, cb) {
  db.get().query(
    'SELECT * FROM meetmeapp.user WHERE username="' + userCred.username + '" AND password="' + userCred.password + '" LIMIT 1',
    function(err, rows) {
      if (err) return cb(err, null);
      if (!rows[0]) return cb("Invalid Login", null);
      return cb(err, rows[0]);
    });
};

exports.selectAll = function (cb) {
  db.get().query('SELECT * FROM meetmeapp.user', function(err, rows) {
    return cb(err, rows);
  });
};
