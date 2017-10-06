angular.module('MPOApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");


	$stateProvider
	.state("search", {
		url: "/search",
		templateUrl: "views/search.html",
		controller: "dataCtrl"
	})
	.state("recipeCard", {
		url: "/recipe/:id",
		templateUrl: "views/recipeCard.html",
		controller: "recipeCtrl"
	})






})