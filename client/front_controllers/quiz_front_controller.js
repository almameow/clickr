//// Quiz Controller
clickrModule.controller("quizController", function($scope, $routeParams, $location, localStorageService, quizFactory) {
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
})