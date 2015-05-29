////// Users Controller
clickrModule.controller("UsersController", function($scope, $window, $location, localStorageService, UsersFactory){
	$scope.master = {};

	// Reset registration form
	$scope.reset = function(form) {
		if (form) {
			form.$setPristine();
			form.$setUntouched();
		}
		$scope.new_user = angular.copy($scope.master);
	};

	// Add user to db
	$scope.join = function(new_user){
		$scope.master = angular.copy(new_user);

		console.log($scope.master);
		UsersFactory.addUser($scope.new_user, function(info){
			if( info === "Error: A user with this email exists." || info === "Error: Passwords do not match."){
				$scope.successmsg = "";
				$scope.errormsg = info;
			}
			else{
				$scope.errormsg = "";
				$scope.successmsg = "You have successfully registered! Please log in.";
			}
		});
	};

	$scope.reset();

	//login
	$scope.login = function(user){
		console.log("Current user:", user);
		UsersFactory.logIn(user, function(info){
			if( info === "Error: There is no user with this email address." || info === "Error: Incorrect password."){
				$scope.successmsg = "";
				$scope.errormsg = info;
			}
			else{
				$scope.errormsg = "";
				$scope.successmsg = "";
				console.log("output from controller: ", info);
				
				// Redirect to dashboard
				//This is not the right way to do this.....not tracking which user is logged in!
				//$window.location.href = "#/dashboard";
				$location.path("/home/" + info._id);
			}
		})
	}
});