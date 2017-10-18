angular.module('MPOApp').controller('dataCtrl', function($scope, dataServ) {

    $scope.offset = 0
    $scope.resultsShown = false;


    dataServ.persistResults ? $scope.recipeResults = dataServ.persistResults : null

    //Generative Functions
    $scope.generateMealPlan = function(cal, time) {
        dataServ.generateMealPlan(cal, time).then((mealPlan) => {
            $scope.mealPlans = mealPlan
        })
    }


    $scope.searchRecipeBasic = function(humanQuery) {
        $scope.humanQuery = humanQuery
        dataServ.searchRecipeBasic(humanQuery, $scope.offset).then((recipes) => {
            if (!recipes.data.length) {
                return $scope.noResults = true;
            } else if (recipes.data.length) {
                $scope.resultsShown = true;
                dataServ.persistResults = recipes.data
                return $scope.recipeResults = recipes.data
            }
        })
    }

    $scope.nextPage = () => {
        $scope.offset += 12
        dataServ.searchRecipeBasic($scope.humanQuery, $scope.offset).then((recipes) => {
            if (!recipes.data.length) {
                $scope.resultsShown = false;
                return $scope.noResults = true;
            } else if (recipes.data.length) {
                $scope.resultsShown = true;
                dataServ.persistResults = recipes.data
                return $scope.recipeResults = recipes.data
            }
            dataServ.persistResults = recipes.data
            return $scope.recipeResults = recipes.data
        })
    }

})