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
		quizFactory.addQuiz($scope.newQuiz);

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

	$scope.newQuestion = function() {
		//Increase question counter
		questionCounter++;
		
		//Set currentQuestion var to questionCounter value
		$scope.currentQuestion = questionCounter;

		console.log($scope.currentQuestion);

		//redirect newquestion page
		$location.path("/create/" + questionCounter);
	}

})