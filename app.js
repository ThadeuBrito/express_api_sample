var app = require('./config/app_config');
var db  = require('./config/db_config');

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>");
})

app.get('/users', function(req, res) {
  db.User.find({}, function(error, users) {
    if (error)
      res.json(error);
    else
      res.json(users);
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
  var id = req.params.id;
  db.User.findById(id, function(error, user) {
    if (error)
      res.json(error);
    else
      res.json(user);
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
