"use strict";
angular.module("MPOApp").directive('typedInput', function() {
    return {
        restrict: 'AE',

        scope: {
            strings: '='
        },

        link: function($scope, $element, $attrs) {

            var options = {
                strings: ["Show me Gluten Free Chicken Recipes",
                    "Show me Curry With No Onions",
                    "Show me Low Fat Steak",
                    "Show me Banana Deserts",
                    "Show me Somethin' Good"
                ],
                smartBackspace: true,
                shuffle: true,
                typeSpeed: 2,
                contentType: "html",
                backSpeed: 1,
                showCursor: true,
                cursorChar: "_",
                attr: 'placeholder',
                loop: true
            };

            $(function() {
                $("#typed-output").typed(options);
            });

        }
    };
});