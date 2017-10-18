angular.module('MPOApp').controller('mealPrepComplexCtrl', function($scope, $rootScope, mealPrepServ, $stateParams, userServ, mealPlans) {
    console.log(mealPlans)
    console.log(mealPlans[0])

    $scope.dates = mealPlans[1]
    $scope.dateHeaderBegin = mealPlans[2]
    $scope.dateHeaderEnd = mealPlans[3]


    this.myDate = new Date();
    this.isOpen = false;
    const pageId = $stateParams.id
    $scope.pageTitle = mealPlans.name

    $scope.getRecipeBooks = () => {
        userServ.getRecipeBooks().then(result => {
            $scope.recipeBooks = result.data
        })
    }

    $scope.getRecipes = (id) => {
        userServ.getRecipesFromBooks(id)
            .then(result => {
                $scope.recipes = result.data
                $scope.nutrients = result
            })
    }


    $scope.getRecipesFromBooks = (id) => {
        return $http.get(`/users/getRecipesFromBooks/${id}`)
            .then(result => {
                return result
            })
    }

    $scope.sortableOptions = {
        connectWith: ".apps-container",
        start: function(e, ui) {
            $scope.sourceModelClone = ui.item.sortable.sourceModel.slice();
        },
        stop: function(e, ui) {
            if (
                $(e.target).hasClass("source") &&
                ui.item.sortable.droptarget &&
                e.target != ui.item.sortable.droptarget[0]
            ) {
                ui.item.sortable.sourceModel.length = 0;
                // clone the original model to restore the removed item
                Array.prototype.push.apply(
                    ui.item.sortable.sourceModel,
                    $scope.sourceModelClone
                );
                $scope.sourceModelClone = null;
            }
        },
        'ui-floating': true
    };




    $scope.saveMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7) => {
        mealPrepServ.getMealPrepData(pageId).then(result => {
            mealPrepServ.updateMealPlanData(morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7).then(result => {
                if (result) {
                    return result
                } 
            })
            // } 
            // else if (!result.data[0].recipes) {
            //     mealPrepServ.saveMealPlanData(morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7).then(result => {
            //         return $scope.calendarData = (JSON.parse(result.data[0].recipes))[0]
            //     })
            // }
        })
    }

    var calendarCells = {}
    for (var i = 0; i < 7; i++) {
        calendarCells['morning' + (i + 1)] = []
        calendarCells['noon' + (i + 1)] = []
        calendarCells['evening' + (i + 1)] = []
    }
    if (mealPlans[0] === null) {
        $scope.calendarData = calendarCells;
    } else if (mealPlans[0].recipes !== null) {
        $scope.calendarData = mealPlans[0][0]
    }


})