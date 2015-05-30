////// Dashboard Controller
clickrModule.controller("dashboardController", function($scope, quizFactory, UsersFactory, $location, $routeParams){

	//pull current user's id from url
	var userID = $location.path();
	var userIDarray = userID.split("/home/");
	userID = userIDarray[1];

	// call on factory to get all quizzes to be displayed on dashboard page
	quizFactory.getQuizzes(function(data){
		$scope.quizzes = data;
	})

	//call on User factory to get user's info based on user's ID
	UsersFactory.getOneUser(userID, function(data) {
		console.log("Inside dashboard Controller, user first name: ", data.fname);
		$scope.username = data.fname;
	})

	// call on factory to remove a quiz from the database
	$scope.removeQuiz = function(quiz){
		quizFactory.removeQuiz(quiz, function() {
			quizFactory.getQuizzes(function(data){
				$scope.quizzes = data;
			})
		})
	}

	// add a quiz from the Create Quiz page
	$scope.addQuiz = function(){
		createQuizCode();
		$scope.newQuiz["quizCode"] = quizCode;
		quizFactory.addQuiz($scope.newQuiz, function(){
			$scope.newQuiz = {};
			quizFactory.getQuizzes(function(data){
				$scope.quizzes = data;
			});
		})
	}

	var quizCode = "";

	function createQuizCode()
	{
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        quizCode += possible.charAt(Math.floor(Math.random() * possible.length));

	    return quizCode;
	}

})