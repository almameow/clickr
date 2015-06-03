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
	userID: String,
	title: String,
	question: String,
	answerA: String,
	answerB: String,
	answerC: String,
	answerD: String,
	correctAnswer: String,
	quizCode: String,
	created: {type: Date, default: Date.now }
});

mongoose.model('Quiz', QuizSchema);

//questions collection will have quizid
//quizid = localstorageid(quiz#) //saving quiz #
//questionnumber = $route.params or counter //saving question #
