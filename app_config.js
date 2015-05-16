var express    = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function(){
  console.log('The server ir running in the port 3000');
});

module.exports = app;
