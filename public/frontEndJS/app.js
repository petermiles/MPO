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

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            this.user = user
        };
        console.log("this is the user:", uid, email)
    })

})