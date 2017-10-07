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
        .state("login", {
            url: "/login",
            templateUrl: "views/directives/login.html",
            controller: "userCtrl"
        })
        .state("recipeBook", {
            url: "/recipeBook",
            templateUrl: "views/recipeBook.html",
            controller: "userCtrl"
        })


})