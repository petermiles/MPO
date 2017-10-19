"use strict";
angular.module("MPOApp").directive("recipeListBox", boxControl);


function boxControl() {
    var directive = {
        link: link,
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
        let clicked = false;
        // $(element).on('click', element => {
        //     if (clicked === false) {
        //         $('#recipeListBox').toggleClass('displayNone')
        //         setTimeout(function() {
        //             // $('#recipeListBox').addClass('displayFixed')
        //             // $('#recipeListBox').css('opacity', '1')
        //             // $('#recipeListBox').css('background', 'rgba(    255, 152, 0, .5)')
        //             // $('')
        //             // $('#recipeListBox').css('width', '50vw')
        //             // $('#recipeListBox').css('height', '20vh')
        //         }, 50)
        //         clicked = true;
        //     } else if (clicked === true) {
        //         // $('#recipeListBox').css('opacity', '0')
        //         // $('#recipeListBox').css('width', '0')
        //         // $('#recipeListBox').css('height', '0')

        //         setTimeout(function() {
        //             $('#recipeListBox').toggleClass('displayNone')
        //         }, 505)
        //         clicked = false
        //     }


        // })

        $(element).on('click', element => {
            if (clicked === false) {
                setTimeout(function() {
                    $('#recipeBoxSideBar').toggleClass('displayNone')
                    $('#recipeBoxSideBar').toggleClass('sideBarTransition')
                    $('#calendar').removeClass('col-12')
                    $('#calendar').addClass('col-10')
                    $('#recipeBoxSideBar').addClass('col-2')
                }, 205)

                clicked = true
            } else if (clicked === true) {
                setTimeout(function() {
                    $('#calendar').removeClass('col-10')
                    $('#calendar').addClass('col-12')
                    $('#recipeBoxSideBar').toggleClass('displayNone')
                    $('#recipeBoxSideBar').toggleClass('sideBarTransition')
                })
                clicked = false
            }
        })

    }
}