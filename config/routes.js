// This is /config/routes.js
var users = require("./../server/controllers/users.js");

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
}