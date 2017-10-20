"use strict";
angular.module("MPOApp").directive('typedInput', function() {
  return {
    restrict: 'AE',

    scope: {
      strings: '='
    },

    link: function($scope, $element, $attrs) {

      var options = {
        strings: $scope.strings,
        typeSpeed: 2,
        contentType: "html",
        showCursor: true,
        cursorChar: "_",
        attr: 'placeholder'
      };

      $(function() {
        $("#typed-output").typed(options);
      });

    }
  };
});