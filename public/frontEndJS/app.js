angular.module('MPOApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider, $provide, ) {


    $provide.factory('user', firebase.auth().onAuthStateChanged(user => {
        if (user) {
            return user
        }
    }))

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
        //     ,
        //     resolve : {
        //         recipeInfo(recipeServ, $stateParams.id){
        //             recipeServ.getRecipeInfo($stateParams.id)
        //         }
        //     }
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
                    console.log($stateParams)
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

        .state('mealPrepComplex' , {
            url: "/Your/MealPreps",
            templateUrl: "views/mealPrepComplex.html",
            controller: "mealPrepCtrl"
        })

})