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

    $scope.saveMealPlanData = (m1, m2, m3, m4, m5, m6, m7, n1, n2, n3, n4, n5, n6, n7, a1, a2, a3, a4, a5, a6, a7) =>
        mealPrepServ.saveMealPlanData(m1, m2, m3, m4, m5, m6, m7, n1, n2, n3, n4, n5, n6, n7, a1, a2, a3, a4, a5, a6, a7, pageId).then((result) => {
            console.log(JSON.parse(result.data[0].recipes))
        })
    $scope.getMealPrepData = () => {
        mealPrepServ.getMealPrepData(pageId).then(result => {
            console.log(result)
        })
    }
})