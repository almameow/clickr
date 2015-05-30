////// Users Factory
clickrModule.factory("UsersFactory", function($http){
	var factory = {};

	// make AJAX request to /order to add order to db
	factory.addUser = function(info, callback){
		$http.post("/add", info).success(function(output){
			// This callback with either show a message on the /reg page 
			callback(output);
		})
	};

	// get current user from the database with specific ID
	factory.getOneUser = function(data, callback){
		$http.get('/get_user/' + data).success(function(output){
			callback(output);
		})
	}

	factory.logIn = function(info, callback){
		$http.post("/login", info).success(function(output){
			callback(output);
		})
	}
	// Return the factory so that everything inside of it is available to the CustomerController
	return factory;
});