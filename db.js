var mySQL = require('mysql');

var state = {
  db: null
};

exports.connect = function(done) {
  if (state.db) return done();
  state.db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "root"
  });
  state.db.connect(function(err) {
    if (err) return done(err);
    state.db.query('USE meetmeapp');
    return done();
  });
};

exports.get = function () {
  return state.db;
};
