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

// Create our QuizSchema
var QuizSchema = new mongoose.Schema({
	title: String,
	questionOne: String,
	answerA: String,
	answerB: String,
	answerC: String,
	answerD: String,
	created: {type: Date, default: Date.now }
});

mongoose.model('Quiz', QuizSchema);