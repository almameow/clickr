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

io.sockets.on('connection', function(socket) {

	// when app user submits code
	socket.on("submitButtonPressed", function(data) {
<<<<<<< HEAD

		console.log(data);

=======
		console.log("Code from app: ", data);
		// Check if code exists in db
>>>>>>> 205937fb51972611e01ac8a1fa7781c93b737f93
		Quiz.findOne({quizCode: data}, function(error, response){ 
			if(response){ // quiz exists
				console.log("Load quiz with code " + data);
				console.log("Quiz data found: ", response);
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

	socket.on("startButton", function() {
		

		io.emit("start"); //full broadcast
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
		console.log("Correct answer is: ", answer);
		socket.emit("finalScores", results); //pass final scores to index.ejs
		io.emit("timesUp", answer); //tell user their result
		//when start button is pressed, reset variable counts
		counterA = 0
		counterB = 0
		counterC = 0
		counterD = 0
		results = {A: 0, B: 0, C: 0, D: 0}
	})

	socket.on("nextPage", function() {
		console.log("inside nextPage");
		io.emit("onNextPage");
	})
})