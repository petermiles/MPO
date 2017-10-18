angular.module('MPOApp', ['ui.router', 'ui.sortable', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']).config(function($stateProvider, $urlRouterProvider, $provide) {

    $urlRouterProvider.otherwise("/");


    $stateProvider
        .state("home", {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "dataCtrl"
        })
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
            templateUrl: "views/login.html",
            controller: "userCtrl"
        })
        .state("recipeBook", {
            url: "/Books",
            templateUrl: "views/recipeBook.html",
            controller: "userCtrl"
        })
        .state("books", {
            url: "/Your/Books/:id",
            templateUrl: "views/recipeBookComplex.html",
            controller: "recipeBooksCtrl",
            resolve: {
                recipes(userServ, $stateParams) {
                    return userServ.getRecipesFromBooks($stateParams.id)
                }
            }

        })
        .state("mealPreps", {
            url: "/MealPreps",
            templateUrl: "views/mealPreps.html",
            controller: "userCtrl"
        })
        .state('mealPrepCalendar', {
            url: "/Your/MealPreps/:id",
            templateUrl: "views/mealPrepComplex.html",
            controller: 'mealPrepComplexCtrl',
            resolve: {
                mealPlans(mealPrepServ, $stateParams) {
                    return mealPrepServ.getMealPrepData($stateParams.id)
                }
            }
        })
        .state('groceryLists', {
            url: "/GroceryLists",
            templateUrl: "views/groceryList.html",
            controller: 'groceryListCtrl'

        })
        .state('groceryListsComplex', {
            url: "/Your/GroceryLists/:id",
            templateUrl: "views/groceryListComplex.html",
            controller: 'yourGroceryListCtrl'

        })
})