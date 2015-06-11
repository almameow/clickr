//// Quiz Controller
clickrModule.controller("quizController", function($scope, $routeParams, $location, localStorageService, quizFactory) {

	var count = 0;

	// call on factory to grab quiz with specific ID
	quizFactory.getOneQuiz($routeParams.id, function(data){
		$scope.quiz = data;
	});

	// call on factory to update quiz with specific ID (ID pulled from url)
	$scope.updateQuiz = function(){
		quizFactory.updateQuiz($routeParams.id, $scope.updatedQuiz, function(){
			$scope.updatedQuiz = {};
		});

		// Redirect to dashboard
		$location.path("/home/" + localStorageService.get("userid"));
	}

	$scope.getAllQuestions = function(){
		// Pull all questions with same quiz ID from Questions model
		quizFactory.getQuestions($routeParams.id, function(data){
			//Save all questions to scope variable
			$scope.allQuestions = data;
			//Create local count variable to count how many times user has clicked "next question"
			if(count < data.length-1){
				$scope.quiz = data[count];
				count++;
			} else{
				$scope.quiz = data[count];
				//make next question button disappear
				$(".nextButton").hide();
			}

		});
	}
})