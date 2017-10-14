angular.module('MPOApp', ['ui.router', 'ui.sortable']).config(function($stateProvider, $urlRouterProvider, $provide) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return this.user
            // console.log(user, "from app.js")
        };
    })

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
            templateUrl: "views/directives/login.html",
            controller: "userCtrl"
        })
        .state("recipeBook", {
            url: "/Books",
            templateUrl: "views/recipeBook.html",
            controller: "userCtrl"
            // Add resolve so it pulls recipe books on page enter
            // Do I have to pass anything into the function or can I just invoke it?
            // Really need to figure out how that contant works.
        })
        .state("books", {
            url: "/Books/Yours/:id",
            templateUrl: "views/yourbooks.html",
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
            // ,
            // resolve: {
            //     mealPlans(mealPrepServ, $stateParams) {
            //         return mealPrepServ.getMealPlans($stateParams.id)
            //     }
            // }
        })
        .state('mealPrepCalendar', {
            url: "/Your/MealPreps/:id",
            templateUrl: "views/mealPrepComplex.html",
            controller: 'mealPrepCtrl'
            // resolve: {
            //     mealPlans(mealPrepServ){

            //     }
            // }
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
            // ,
            // resolve: {
            //     groceries(groceryListServ, $stateParams.id) {
            //         return groceryListServ.getItemsInGroceryLists($stateParams.id)
            //     }
            // }
        })
})