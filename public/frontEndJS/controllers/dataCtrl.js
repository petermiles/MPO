angular.module('MPOApp').controller('dataCtrl', function($scope, dataServ) {




    dataServ.persistResults ? $scope.recipeResults = dataServ.persistResults : null

    //Generative Functions
    $scope.generateMealPlan = function(cal, time) {
        dataServ.generateMealPlan(cal, time).then((mealPlan) => {
            $scope.mealPlans = mealPlan
        })
    }


    $scope.searchRecipeBasic = function(humanQuery, diet, badIng, reqInstr, intol, limit, recType) {
        dataServ.searchRecipeBasic(humanQuery, diet, badIng, reqInstr, intol, limit, recType).then((recipes) => {
            dataServ.persistResults = recipes.data
            return $scope.recipeResults = recipes.data
        })
    }

})