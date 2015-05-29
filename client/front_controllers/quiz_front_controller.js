//// Quiz Controller
clickrModule.controller("quizController", function($scope, $routeParams, quizFactory) {
	// call on factory to grab quiz with specific ID
	quizFactory.getOneQuiz($routeParams.id, function(data){
		$scope.quiz = data;
	});

	// call on factory to update quiz with specific ID
	$scope.updateQuiz = function(){
		quizFactory.updateQuiz($routeParams.id, $scope.updatedQuiz, function(){
			$scope.updatedQuiz = {};
			quizFactory.getOneQuiz($routeParams.id, function(data){
				$scope.quiz = data;
			});
		})
	}
})