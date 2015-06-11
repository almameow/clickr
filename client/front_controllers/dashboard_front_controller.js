////// Dashboard Controller
clickrModule.controller("dashboardController", function($scope, quizFactory, UsersFactory, $location, $routeParams, localStorageService){

	var questionCounter = 1;

	// If user is logged in
	if(localStorageService.get('loggedin') == "true" && localStorageService.get('userid') != ""){
		// call on factory to get all quizzes to be displayed on dashboard page
		quizFactory.getQuizzes(localStorageService.get('userid'), function(data){
			$scope.quizzes = data;
		});
	} else {
		$location.path("#/");
	}
	

	// call on factory to remove a quiz from the database
	$scope.removeQuiz = function(quiz){
		quizFactory.removeQuiz(quiz, function() {
			quizFactory.getQuizzes(localStorageService.get('userid'), function(data){
				$scope.quizzes = data;
			})
		})
	}

	// add a quiz from the Create Quiz page
	$scope.addQuiz = function(){
		createQuizCode();
		$scope.newQuiz["userID"] = localStorageService.get('userid');
		$scope.newQuiz["quizCode"] = quizCode;
		quizFactory.addQuiz($scope.newQuiz, function(data){
			//console.log("Data in front controller:", data._id);
			localStorageService.set("currentQuiz", data._id);
		});
		// Redirect to dashboard
			$location.path("/home/" + localStorageService.get('userid'));
	}

	var quizCode = "";

	function createQuizCode()
	{
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        quizCode += possible.charAt(Math.floor(Math.random() * possible.length));
	    	//to add: if quizCode exists, recall createQuizCode()

	    return quizCode;
	}

	// From create quiz page, save and load newquestion page
	$scope.newQuizNewQuestion = function() {
		createQuizCode();
		$scope.newQuiz["userID"] = localStorageService.get('userid');
		$scope.newQuiz["quizCode"] = quizCode;
		quizFactory.addQuiz($scope.newQuiz, function(data){
			//console.log("Data in front controller:", data._id);
			localStorageService.set("currentQuiz", data._id);
			// Redirect to new question page
			$location.path("/create/" + localStorageService.get('currentQuiz'));
		});
	}	

	// From newquestion page, save and clear form
	$scope.addNewQuestion = function(form) {
		// Save quizID to newQuiz
		$scope.newQuestion["quizID"] = localStorageService.get("currentQuiz");
		// console.log("new question data: ", $scope.newQuestion);
		quizFactory.addQuestion($scope.newQuestion, function(data){
			console.log("Returned from save: ", data);
			$scope.newQuestion = {};
		})
		// Reset form
			form.$setPristine();
			form.$setUntouched();
	}

	// From newquestion page, save and return to dashboard
	$scope.saveQuiz = function(){
		// Save quizID to newQuiz
		$scope.newQuestion["quizID"] = localStorageService.get("currentQuiz");
		// console.log("new question data: ", $scope.newQuestion);
		quizFactory.addQuestion($scope.newQuestion, function(data){
			console.log("Returned from save: ", data);
			// Reset localStorageService currentQuiz
			localStorageService.set("currentQuiz", "");
			// Redirect to dashboard
			$location.path("/home/" + localStorageService.get('userid'));
		});
	}
		

})