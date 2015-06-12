// Require Express so we can build an Express App
var express = require("express");

// Require path so we can use path functions (like path.join)
var path = require("path");

// Instantiate the App
var app = express();

// Require body-Parser for POST data
var bodyParser = require("body-Parser");
app.use(bodyParser.json());

// Require the mongoose config file
// Always require Mongoose before routes!! 
// Routes references files that reference mongoose, so requiring routes before mongoose will cause errors
require("./config/mongoose.js");

// Require and run the code from routes.js and pass it app so we can attach routing rules to our express application
require("./config/routes.js")(app);

// Set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, "./client")));

var server = app.listen(8000, function(){
	console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');
var Question = mongoose.model('Question');

var correctAnswer = "";
var quizQuestion = "";
var nextCorrectAnswer = "";
var nextQuizQuestion = "";
var allRemainingQuestions = [];

var questionCounter = -1;

var counterA = 0;
var counterB = 0;
var counterC = 0;
var counterD = 0;
var results = {A: counterA, B: counterB, C: counterC, D: counterD};

io.sockets.on('connection', function(socket) {

	// when app user submits code
	socket.on("submitButtonPressed", function(data) {
		// Check if code exists in db
		Quiz.findOne({quizCode: data}, function(error, response){ 
			if(response){ // quiz exists

				Question.find({quizID: response._id}, function(err, data){
					if(err)
					{
						console.log("Quiz was not grabbed from the database.");
					} else {
						console.log("other questions:", data);
						//Save values for first quiz question
						correctAnswer = response.correctAnswer.toUpperCase();
						quizQuestion = response.question;
						io.emit("correctAnswerIs", correctAnswer);

						// If quiz has more than one question
						if(data.length > 0){ 
							console.log("Inside here!");
							io.emit("otherQuestions", data);
						}
					}
				})
				socket.emit("displayQuiz", data);
			}
			else{
				console.log("No quiz with the code you entered exists.");
				socket.emit("noQuizMessage");
			}
		})
	})

	//when user presses a button, increase counter
	socket.on("buttonPressed", function(data) {
		if (data == "1") {
			counterA++;
			results.A += counterA;
		} else if (data == "2") {
			counterB++;
			results.B += counterB;
		} else if (data == "3") {
			counterC++;
			results.C += counterC;
		} else if (data == "4") {
			counterD++;
			results.D += counterD;
		}
		console.log("counterA:", counterA);
		console.log("counterB:", counterB);
		console.log("counterC:", counterC);
		console.log("counterD:", counterD);
		console.log(results);
	})

	// Instructor starts quizk
	socket.on("startButton", function() {
		//full broadcast to apps, enable buttons and display current question
		io.emit("start", quizQuestion); 
	})

	socket.on("timeIsUp", function(data) {
		var answer = 0;

		if(data == "A") {
			answer = 1
		} else if (data == "B") {
			answer = 2
		} else if (data == "C") {
			answer = 3
		} else if (data == "D") {
			answer = 4
		}
		socket.emit("finalScores", results); //pass final scores to index.ejs
		io.emit("timesUp", answer); //tell user their result
		
		//when start button is pressed, reset variable counts
		counterA = 0
		counterB = 0
		counterC = 0
		counterD = 0
		results = {A: 0, B: 0, C: 0, D: 0}
	})

	socket.on("nextQuestion", function() {
		console.log("inside nextPage");
		io.emit("onNextQuestion");
		console.log("inside server question: ", quizQuestion);

	})

	// increaseCount and remainingQuestions both handle tracking and displaying the questions/answers to the DESKTOP
	socket.on("increaseCount", function(){
		quizQuestion = nextQuizQuestion;
		correctAnswer = nextCorrectAnswer;

		console.log("Teacher pressed Next button. Current quiz question is:", quizQuestion);
		console.log("Current correct answer:", correctAnswer);

		// When next button is clicked, increase questionCounter
		questionCounter++;
		if(questionCounter < allRemainingQuestions.length){
			nextQuizQuestion = allRemainingQuestions[questionCounter].question;
			nextCorrectAnswer = allRemainingQuestions[questionCounter].correctAnswer;
			console.log("Next quiz question is:", nextQuizQuestion);
			console.log("nextCorrectAnswer:", nextCorrectAnswer);
		}
		
	})
	socket.on("remainingQuestions", function(data){
		//when quiz is first loaded, set questionCounter = 0
		questionCounter = 0;
		
		allRemainingQuestions = data;
		console.log("allRemainingQuestions:", allRemainingQuestions);

		nextQuizQuestion = allRemainingQuestions[questionCounter].question;
		nextCorrectAnswer = allRemainingQuestions[questionCounter].correctAnswer;
		console.log("User submitted quiz code. Current quiz question is:", quizQuestion);
		console.log("Current correct answer:", correctAnswer);
		console.log("Next quiz question is:", nextQuizQuestion);
		console.log("nextCorrectAnswer:", nextCorrectAnswer);
	})

})