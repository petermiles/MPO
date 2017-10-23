angular.module('MPOApp').controller('mealPrepComplexCtrl', function($scope, $rootScope, mealPrepServ, $stateParams, userServ, mealPlans) {
    $scope.dates = mealPlans[1]
    $scope.dateHeaderBegin = mealPlans[2]
    $scope.dateHeaderEnd = mealPlans[3]
    const pageId = $stateParams.id
    $scope.pageTitle = mealPlans[4]

    $scope.deletedItems = []

    // $scope.getRecipeBooks = () => {
    userServ.getRecipeBooks().then(result => {
        $scope.recipeBooks = result[0]
    })
    // }

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
    $scope.deleteFromList = () => {
        console.log(this)

        $(this).parent().remove();
    }

    $scope.deletedItems = []

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

    $scope.sortableOptions = {
        'ui-floating': true,
        tolerance: 'pointer',
        helper: 'sortable-placeholder',
        connectWith: ".apps-container",
        start: function(e, ui) {
            $(e.target).data("ui-sortable").floating = true;
            $scope.sourceModelClone = ui.item.sortable.sourceModel.slice();
            ui.item.show().addClass('original-placeholder');
        },
        stop: function(e, ui) {
            $(e.target).data("ui-sortable").floating = true;
            if (
                $(e.target).hasClass('source') &&
                ui.item.sortable.droptarget &&
                e.target != ui.item.sortable.droptarget[0]
            ) {
                ui.item.sortable.sourceModel.length = 0;
                Array.prototype.push.apply(
                    ui.item.sortable.sourceModel,
                    $scope.sourceModelClone
                );
                console.log(ui.item.sortable.sourceModel)
                $scope.sourceModelClone = null;
            } 
            $scope.saveMealPlanData($scope.calendarData.morning1, $scope.calendarData.morning2, $scope.calendarData.morning3, $scope.calendarData.morning4, $scope.calendarData.morning5, $scope.calendarData.morning6, $scope.calendarData.morning7, $scope.calendarData.noon1, $scope.calendarData.noon2, $scope.calendarData.noon3, $scope.calendarData.noon4, $scope.calendarData.noon5, $scope.calendarData.noon6, $scope.calendarData.noon7, $scope.calendarData.evening1, $scope.calendarData.evening2, $scope.calendarData.evening3, $scope.calendarData.evening4, $scope.calendarData.evening5, $scope.calendarData.evening6, $scope.calendarData.evening7)
        }
    };
})