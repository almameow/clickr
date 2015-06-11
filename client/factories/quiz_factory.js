////// Quiz Factory
clickrModule.factory("quizFactory", function($http) {

	var factory = {};

	// get all quizzes from database
	factory.getQuizzes = function(info, callback){
		$http.get('/quizzes/' + info).success(function(output){
			callback(output);
		})
	};

	factory.getQuestions = function(info, callback){
		$http.get('/questions/' + info).success(function(output){
			callback(output);
		})
	};

	// add a quiz into the database
	factory.addQuiz = function(info, callback) {
		$http.post("add_quiz", info).success(function(response){
			callback(response);
		});

	}
	factory.addQuestion = function(info, callback){
		$http.post("add_question", info).success(function(response){
			callback(response);
		})
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
		console.log("From factory, Quiz ID: ", data);
		console.log("From factory, Updated info: ", info);
		$http.post("/update_quiz/"+ data, info).success(function(output){
			callback(output);
		});
	}

	


	return factory;

})