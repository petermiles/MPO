angular.module('MPOApp').controller('mealPrepCtrl', function($scope, $rootScope, mealPrepServ, $stateParams, userServ) {
    const pageId = $stateParams.id

    $scope.getRecipeBooks = () => {
        userServ.getRecipeBooks().then(result => {
            $scope.recipeBooks = result.data
        })
    }
    $scope.pageTitle = $stateParams.id

    $scope.getRecipes = (id) => {
        userServ.getRecipesFromBooks(id)
            .then(result => {
                console.log(result.data)
                $scope.recipes = result.data
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
        }
    };

    var calendarCells = {}
    for (var i = 0; i < 7; i++) {
        calendarCells['morning' + (i + 1)] = []
        calendarCells['noon' + (i + 1)] = []
        calendarCells['evening' + (i + 1)] = []
    }

    $scope.calendarData = calendarCells;

    $scope.saveMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, afternoon1, afternoon2, afternoon3, afternoon4, afternoon5, afternoon6, afternoon7) =>
        mealPrepServ.saveMealPlanData(morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, afternoon1, afternoon2, afternoon3, afternoon4, afternoon5, afternoon6, afternoon7)

    $scope.getMealPrepData = () => {
        mealPrepServ.getMealPrepData().then(result => {
            $scope.calendarData = result[0]
            console.log($scope.calendarData)

        })
    }

})