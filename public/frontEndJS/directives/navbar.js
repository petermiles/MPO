"use strict";
angular.module("MPOApp").directive("navbar", function() {
  return {
    restrict: "E",
    templateUrl: "views/directives/nav.html",
    controller: function($scope, $location) {
      var uiConfig = {
        signInSuccessUrl: "index.html",
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: "<your-tos-url>"
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start("#firebaseui-auth-container", uiConfig);
      $scope.isActive = function(path) {
        var currentPath = $location.path().split("/")[1];
        if (currentPath.indexOf("?") !== -1) {
          currentPath = currentPath.split("?")[0];
        }
        return currentPath === path.split("/")[1];
      };
    }
  };
});
