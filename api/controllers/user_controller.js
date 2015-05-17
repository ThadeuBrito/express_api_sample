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

exports.update = function(req, callback) {
  db.User.findById(req.params.id, function(error, user) {
    if (req.body.name)
      user.name = req.body.name;

    if (req.body.email)
      user.email = req.body.email;

    user.updated_at = new Date;

    user.save(function(error, user) {
      if (error)
        callback(error);
      else
        callback(user);
    });
  });
}

exports.delete = function(params, callback) {
  db.User.findById(params.id, function(error, user) {
    if (error) {
      callback(error);
    } else {
      user.remove(function(error) {
        if (!error)
          callback('User successfully removed!');
      });
    }
  });
}
