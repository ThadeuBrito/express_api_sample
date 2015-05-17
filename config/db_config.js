var dbURI    = "mongodb://127.0.0.1/express_api_sample";
var mongoose = require('mongoose').connect(dbURI);
var db       = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting!'));

db.once('open', function() {
  console.log('Mongo db connected!');

  var userSchema = mongoose.Schema({
    name: String,
    email: String,
    created_at: Date,
    updated_at: Date
  });

  exports.User = mongoose.model('User', userSchema);
});
