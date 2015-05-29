// This is /server/controllers/users.js

// Require mongoose and User model
var mongoose = require("mongoose");
var User = mongoose.model("User");

module.exports = (function(){
	return{

		// Add new user to db
		add: function(req, res) {
			// Create new model
			var newUser = new User(req.body);
			
			// If user with same email already exists in db, do not add to db
			User.findOne({email: req.body.email}, function(error, response){ 
				console.log("FindOne result: ", response);
				// If user already exists
				if(response){ 
					console.log("User already exists in db");
					res.send("Error: A user with this email exists.");
				}
				else{
					// If passwords do not match, do not add to db
					if( req.body.password !== req.body.pass2){
						console.log("Passwords do not match");
						res.send("Error: Passwords do not match.");
					}
					else{
						newUser.save(function(error, results){
							if(error){
								console.log("Did not save new user to db");
							} else {
								console.log("Successfully saved new user to db");
								res.json(results);
							}
						});
					}
				}
			})
		},

		// Log in user
		login: function(req, res){
			User.findOne({email: req.body.email}, function(error, response){ 
				// If user exists
				if(response){
					// If user has matching password
					if( req.body.password === response.password)
					{
						console.log("Logged-in user's info: ", response);
						res.json(response);
					}
					else{
						console.log("Incorrect password");
						res.send("Error: Incorrect password.");
					}
				}
				else{
					console.log("User does not exist in db");
					res.send("Error: There is no user with this email address.");
				}
			})
		}
	}
})();