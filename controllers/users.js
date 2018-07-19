var Users = require('../models/users');

exports.create = function (req, res) {
  var userCred = {
    username: req.body.username,
    password: req.body.password
  };
  var userDet = {
    user_id: "",
    name: req.body.firstname,
    surname: req.body.familyname,
    dob: req.body.dob,
    gender: req.body.gender
  };
  Users.create(userCred, userDet, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Saving first user failed!' });
    }
    res.sendStatus(200);
  });
};

exports.login = function(req, res) {
  var userCred = {
    username: req.body.username,
    password: req.body.password
  };
  Users.login(userCred, function(err, rows) {
    if (err) {
      console.log(err);
      return res.status(404).send({"error": err});
    }
    res.send(rows);
  });
};

exports.selectAll = function (req, res) {
  Users.selectAll(function (err, rows) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(rows);
  });
};
