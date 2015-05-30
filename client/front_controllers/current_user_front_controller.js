////// currentUserController Controller
clickrModule.controller("currentUserController", function($scope, UsersFactory, $location, $routeParams, localStorageService){

	$scope.username = "";
	$scope.userid = localStorageService.get('userid');

	//call on User factory to get user's info based on user's ID
	UsersFactory.getOneUser($scope.userid, function(data) {
		console.log("Inside getOneUser");
		localStorageService.set('username', data.fname);
		$scope.username = localStorageService.get('username');
		console.log("username: ", $scope.username);
	});

})