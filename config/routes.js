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
    userController.create(req, function(response) {
      res.json(response);
    });
  });

  app.get('/users/:id', function(req, res) {
    userController.show(req, function(response) {
      res.json(response);
    });
  });

  app.put('/users/:id', function(req, res) {
    userController.update(req, function(response) {
      res.json(response);
    });
  });

  app.delete('/users/:id', function(req, res) {
    userController.delete(req, function(response) {
      res.json(response);
    });
  });
}
