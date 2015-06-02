////// currentUserController Controller
clickrModule.controller("currentUserController", function($scope, UsersFactory, $location, $routeParams, localStorageService){

	$scope.username = "";
	$scope.userid = localStorageService.get('userid');

	//call on User factory to get user's info based on user's ID
	UsersFactory.getOneUser($scope.userid, function(data) {
		localStorageService.set('username', data.fname);
		$scope.username = localStorageService.get('username');
	});

	$scope.logout = function(){
		//set loggedin to false
		localStorageService.set("loggedin", "false");

		//set userid to empty string
		localStorageService.set("userid", "");

		//redirect to main page
		$location.path("#/");
	}

})