// This is /config/routes.js
var users = require("./../server/controllers/users.js");
var quizzes = require('./../server/controllers/quizzes.js');

module.exports = function(app){
	// Receive post request via AJAX to /add
	// Direct request to the users.add method
	app.post("/add", function(request, response){
		users.add(request, response);
	});

	// Login user
	app.post("/login", function(request, response){
		users.login(request, response);
	})

	// Get current user's info
	app.get('/get_user/:id', function(req, res){
		users.getUser(req, res);
	})

	// Get all current user's quizzes
	app.get('/quizzes/:id', function(req, res){
		quizzes.show(req, res);
	})

	// Add quiz
	app.post('/add_quiz', function(req, res){
		quizzes.add(req, res);
	})

	// Remove quiz
	app.post('/remove_quiz', function(req, res) {
		quizzes.remove(req, res);
	})

	// Show quiz
	app.post('/get_quiz/:id', function(req, res){
		quizzes.getOneQuiz(req, res);
	})

	// Edit quiz
	app.post('/update_quiz/:id', function(req, res){
		quizzes.updateQuiz(req, res);
	})
}