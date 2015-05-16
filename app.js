var express = require('express');
var bodyParser = require('body-parser');

var db_string = "mongodb://127.0.0.1/express_api_sample";
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

//MODELS
var User;

db.on('error', console.error.bind(console, 'Error connecting!'));

db.once('open', function() {
  console.log('Mongo db connected!');

  var userSchema = mongoose.Schema({
    name: String,
    email: String,
    created_at: Date,
    updated_at: Date
  });

  User = mongoose.model('User', userSchema);
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function(){
  console.log('The server ir running in the port 3000');
});

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>");
})

app.get('/users', function(req, res) {
  User.find({}, function(error, users) {
    if (error)
      res.json(error);
    else
      res.json(users);
  });
})

app.post('/users', function(req, res) {
  new User({
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
  User.findById(id, function(error, user) {
    if (error)
      res.json(error);
    else
      res.json(user);
  });
});

app.put('/users/:id', function(req, res) {
  var id = req.params.id;
  User.findById(id, function(error, user) {
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
  User.findById(id, function(error, user) {
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
