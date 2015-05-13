var express = require('express');

var app = express();

app.listen(5000, function(){
  console.log('The server ir running in the port 5000');
});

app.get('/', function(req, res) {
  res.send("<h1>Hello World!</h1>");
})
