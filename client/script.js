// Create clickr Module
var clickrModule = angular.module("clickrApp", ['ngRoute', 'LocalStorageModule']);

// Use the config method to set up routing for partials
clickrModule.config(function ($routeProvider){
	$routeProvider
		.when("/", {
			templateUrl: "partials/index.html"
		})
		.when("/login", {
			templateUrl: "partials/login.html"
		})
		.when("/join", {
			templateUrl: "partials/register.html"
		})
		.when("/create", {
			templateUrl: "partials/create.html"
		})
		.when("/create/:id", {
			templateUrl: "partials/newquestion.html"
		})
		.when("/home", {
			templateUrl: "partials/dashboard.html"
		})
		.when("/home/:id", {
			templateUrl: "partials/dashboard.html"
		})
		.when("/quiz/:id", {
			templateUrl: "partials/quiz.html"
		})
		.when("/edit/:id", {
			templateUrl: "partials/edit.html"
		})
		.otherwise({
			redirectTo: "/"
		});
});