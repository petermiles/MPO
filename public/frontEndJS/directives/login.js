"use strict";
angular.module("MPOApp").directive("login", function() {
    return {
        restrict: "E",
        templateUrl: "views/directives/login.html",
        controller: function($scope, userServ) {
            $scope.userInfo = userServ.userInfo
            $scope.createUser = userServ.createUser;
            $scope.signIn = (email, password) => {
                console.log(email, password)
                userServ.signIn(email, password)
            }
            $scope.signOut = userServ.signOut
        }

    }
});