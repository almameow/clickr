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

	app.get('/quizzes', function(req, res){
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
}