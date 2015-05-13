var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function(){
  console.log('The server ir running in the port 5000');
});

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>");
})

app.get('/users', function(req, res) {
})

app.post('/users', function(res, req) {
});

app.get('/users/:id', function(res, req) {
});

app.put('/users/:id', function(res, req) {
});

app.delete('/users/:id', function(res, req) {
});
