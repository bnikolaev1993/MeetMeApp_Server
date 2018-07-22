var Places = require('../models/places');

exports.create = function (req, res) {
  var placeCred = {
    user_id: req.body.creatorID,
    name: req.body.name,
    placemark: req.body.placemark,
    privacy: req.body.privacy,
    lat: req.body.lat,
    long: req.body.long
  };
  Places.create(placeCred, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ error: 'Saving place failed!' });
    }
    res.sendStatus(200);
  });
};
