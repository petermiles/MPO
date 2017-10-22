"use strict";
angular.module("MPOApp").directive("navbar", function() {
  return {
    restrict: "E",
    templateUrl: "views/directives/nav.html",
    controller: "userCtrl"
  }
});



