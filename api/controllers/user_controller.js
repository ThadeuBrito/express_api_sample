var db = require('../../config/db_config');

exports.index = function(callback) {
  db.User.find({}, function(error, users) {
    if (error)
      callback(error);
    else
      callback(users);
  });
};

exports.show = function(params, callback) {
  db.User.findById(params.id, function(error, user) {
    if (error)
      callback(error);
    else
      callback(user);
  });
};
