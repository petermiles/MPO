angular.module('MPOApp', ['ui.router', 'ui.sortable']).config(function($stateProvider, $urlRouterProvider) {


    $urlRouterProvider.otherwise("/home");


    $stateProvider
        .state("home", {
            url: "/home",
            params: {
                searchValue: null
            },
            templateUrl: "views/home.html",
            controller: "dataCtrl"
        })
        .state("search", {
            url: "/search/:searchValue",
            params: {
                searchValue: null
            },
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
            controller: "recipeBooksCtrl"
        })
        .state("books", {
            url: "/Your/Books/:id/:title",
            templateUrl: "views/recipeBookComplex.html",
            controller: "recipeBooksComplexCtrl",
            resolve: {
                recipes(userServ, $stateParams) {
                    return userServ.getRecipesFromBooks($stateParams.id)
                }
            }

        })
        .state("mealPlans", {
            url: "/MealPlans",
            templateUrl: "views/mealPlans.html",
            controller: "mealPrepCtrl"
        })
        .state('mealPlanCalendar', {
            url: "/Your/MealPlans/:id",
            templateUrl: "views/mealPlanComplex.html",
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
            controller: 'groceryListCtrl',
            resolve: {
                user: () => { return firebase.auth() }
            }

        })
        .state('groceryListsComplex', {
            url: "/Your/GroceryLists/:id",
            templateUrl: "views/groceryListComplex.html",
            controller: 'yourGroceryListCtrl'

        })
})