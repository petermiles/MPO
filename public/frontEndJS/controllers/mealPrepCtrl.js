angular.module('MPOApp').controller('mealPrepCtrl', function($scope, $rootScope, mealPrepServ, $stateParams, userServ) {

    $scope.getRecipeBooks = () => {
        userServ.getRecipeBooks().then(result => {
            $scope.recipeBooks = result.data
        })
    }
    $scope.pageTitle = $stateParams.id

    // $scope.getRecipesFromBooks = () => {
    // user
    // }

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

    $scope.testFunction = (test) => {
console.log(test)
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
        calendarCells['morning' + (i+1)] = []
        calendarCells['noon' + (i+1)] = []
        calendarCells['evening' + (i+1)] = []
    }
    $scope.calendarData = calendarCells
    console.log($scope.calendarData)


    // $scope.morning1 = []
    // $scope.morning2 = []
    // $scope.morning3 = []
    // $scope.morning4 = []
    // $scope.morning5 = []
    // $scope.morning6 = []
    // $scope.morning7 = []
})