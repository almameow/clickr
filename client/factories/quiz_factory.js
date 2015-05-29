////// Quiz Factory
clickrModule.factory("quizFactory", function($http) {

	var factory = {};

	// get all quizzes from database
	factory.getQuizzes = function (callback){
		$http.get('/quizzes').success(function(output){
			callback(output);
		})
	};

	// add a quiz into the database
	factory.addQuiz = function(info) {
		$http.post("add_quiz", info).success();
	}

	// remove a quiz from the database
	factory.removeQuiz = function(info, callback) {
		$http.post('/remove_quiz', info).success(function(output){
			callback(output);
		})
	}

	// get one quiz from the database with specific ID
	factory.getOneQuiz = function(data, callback){
		// console.log(data);
		$http.post('/get_quiz/'+ data).success(function(data){
			callback(data);
		})
	}

	// update a quiz in the database with specific ID
	factory.updateQuiz = function(data, info, callback) {
		console.log(data);
		console.log(info);
		$http.post("/update_quiz/"+ data, info).success(function(output){
			callback(output);
		});
	}

	return factory;

})