angular.module('MPOApp').controller('mealPrepCtrl', function($scope, $rootScope, mealPrepServ, $stateParams, userServ) {
    // console.log(mealPlans[0])

    this.myDate = new Date();
    this.isOpen = false;

    userServ.userInfo().then(result => {
       $scope.userName = result
    })




    $scope.createMealPlan = (name, notes, date) => {
        mealPrepServ.createMealPlan(name, notes, date).then(result => {
            $scope.mealPlans = result.data
            return result
        }).then(result => {
            // length = result.data.length-1
            // console.log(result.data[length].id)
            mealPrepServ.createEmptyMealPlan(name, date, result.data[result.data.length - 1].id)
        })
    }

    $scope.deleteMealPlan = (planId) => {
        mealPrepServ.deleteMealPlan(planId).then(result => {
            $(".modal-backdrop").hide();
            $scope.mealPlans = result.data
        })
    }

    $scope.getMealPlans = () => {
        mealPrepServ.getMealPlans().then(result => {
            $scope.mealPlans = result.data
        })
    }
    // const pageId = $stateParams.id
    // $scope.pageTitle = $stateParams.id

    // $scope.getRecipeBooks = () => {
    //     userServ.getRecipeBooks().then(result => {
    //         $scope.recipeBooks = result.data
    //     })
    // }

    // $scope.getRecipes = (id) => {
    //     userServ.getRecipesFromBooks(id)
    //         .then(result => {
    //             $scope.recipes = result.data
    //             $scope.nutrients = result
    //         })
    // }


    // $scope.getRecipesFromBooks = (id) => {
    //     return $http.get(`/users/getRecipesFromBooks/${id}`)
    //         .then(result => {
    //             return result
    //         })
    // }

    // $scope.sortableOptions = {
    //     connectWith: ".apps-container",
    //     start: function(e, ui) {
    //         $scope.sourceModelClone = ui.item.sortable.sourceModel.slice();
    //     },
    //     stop: function(e, ui) {
    //         if (
    //             $(e.target).hasClass("source") &&
    //             ui.item.sortable.droptarget &&
    //             e.target != ui.item.sortable.droptarget[0]
    //         ) {
    //             ui.item.sortable.sourceModel.length = 0;
    //             // clone the original model to restore the removed item
    //             Array.prototype.push.apply(
    //                 ui.item.sortable.sourceModel,
    //                 $scope.sourceModelClone
    //             );
    //             $scope.sourceModelClone = null;
    //         }
    //     }
    // };




    // $scope.saveMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7) => {
    //     mealPrepServ.getMealPrepData(pageId).then(result => {
    //         if (!result.data) {
    //             mealPrepServ.updateMealPlanData(morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7).then(result => {
    //                 console.log("updated", )
    //                 return $scope.calendarData = (JSON.parse(result.data[0].recipes))[0]
    //             })
    //         } else if (!result[0]) {
    //             mealPrepServ.saveMealPlanData(morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7).then(result => {
    //                 return $scope.calendarData = (JSON.parse(result.data[0].recipes))[0]
    //             })
    //         }
    //     })
    // }

    // var calendarCells = {}
    // for (var i = 0; i < 7; i++) {
    //     calendarCells['morning' + (i + 1)] = []
    //     calendarCells['noon' + (i + 1)] = []
    //     calendarCells['evening' + (i + 1)] = []
    // }
    // if (mealPlans[0]) {
    //     $scope.calendarData = mealPlans[0]
    // } else if (!mealPlans[0]) {
    //     $scope.calendarData = calendarCells;
    // }


})