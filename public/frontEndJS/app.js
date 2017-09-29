angular.module('MPOApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");


	$stateProvider
	.state("search", {
		url: "/search",
		templateUrl: "views/search.html",
		controller: "dataCtrl"
	})






})