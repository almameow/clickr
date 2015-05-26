// This is /server/models/user.js

var mongoose = require('mongoose');

// Create our UserSchema
var UserSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  createdAt: {type:Date, default: Date.now}
});

mongoose.model('User', UserSchema);