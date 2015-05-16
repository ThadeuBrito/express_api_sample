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
    created_at: Date
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

app.post('/users', function(res, req) {
});

app.get('/users/:id', function(res, req) {
});

app.put('/users/:id', function(res, req) {
});

app.delete('/users/:id', function(res, req) {
});
