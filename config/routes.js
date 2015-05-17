var db = require('./db_config');
var userController = require('../api/controllers/user_controller.js');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send("<h1>Hello World!</h1>");
  })

  app.get('/users', function(req, res) {
    userController.index(function(response) {
      res.json(response);
    });
  })

  app.post('/users', function(req, res) {
    new db.User({
      name: req.body.name,
      email: req.body.email,
      created_at: new Date,
      updated_at: new Date
    }).save(function(error, user) {
      if (error)
        res.json(error);
      else
        res.json(user);
    });
  });

  app.get('/users/:id', function(req, res) {
    userController.show(req.params, function(response) {
      res.json(response);
    });
  });

  app.put('/users/:id', function(req, res) {
    var id = req.params.id;
    db.User.findById(id, function(error, user) {
      if (req.body.name)
        user.name = req.body.name;

      if (req.body.email)
        user.email = req.body.email;

      user.updated_at = new Date;

      user.save(function(error, user) {
        if (error)
          res.json(error);
        else
          res.json(user);
      });

    })
  });

  app.delete('/users/:id', function(req, res) {
    var id = req.params.id;
    db.User.findById(id, function(error, user) {
      if (error) {
        res.json(error);
      } else {
        user.remove(function(error) {
          if (!error)
            res.json('User successfully removed!')
        });
      }
    });
  });
}
