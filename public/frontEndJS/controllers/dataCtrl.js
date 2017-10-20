angular.module('MPOApp').controller('dataCtrl', function($scope, $state, dataServ) {

    $scope.offset = 0
    $scope.resultsShown = false;
    $scope.showPreviousButton = false;
    $scope.showNextButton = false;

    $scope.homePageSearch = (searchValue) => {
        $scope.homeSearchValue = searchValue;
        $state.go("search", $scope.homeSearchValue).then(result => {
            $scope.humanQuery = $scope.homeSearchValue
        })
    }

    $scope.texttyping = ["Gluten Free Chicken",
        "Curry With No Onions",
        "Low Fat Steak",
        "Banana Deserts"
    ]


    dataServ.persistResults ? $scope.recipeResults = dataServ.persistResults : null

    //Generative Functions
    $scope.generateMealPlan = function(cal, time) {
        dataServ.generateMealPlan(cal, time).then((mealPlan) => {
            $scope.mealPlans = mealPlan
        })
    }

    $scope.searchRecipeBasic = function(humanQuery) {
        dataServ.searchRecipeBasic(humanQuery, $scope.offset).then((result) => {
            $scope.humanQuery = humanQuery
            console.log(result)
            $scope.firstRecipe = result.data[0].id
            if (result.data.length <= 12) {
                $scope.showNextButton = false;
            }
            if (result.data.length === 12) {
                $scope.resultsShown = true;
                $scope.showNextButton = true;
            }
            if (!result.data.length) {
                return $scope.noResults = true;
            } else if (result.data.length) {
                $scope.resultsShown = true;
                dataServ.persistResults = result.data
                return $scope.recipeResults = result.data
            }
        })

    }

    $scope.incrementOffset = () => {
        console.log($scope.firstRecipe)
        $scope.offset += 12
        dataServ.searchRecipeBasic($scope.humanQuery, $scope.offset).then((recipes) => {
            if (!recipes.data.length) {
                $scope.showPreviousButton = true;
                $scope.resultsShown = false;
                return $scope.noResults = true;
            } else if (recipes.data.length) {
                $scope.showPreviousButton = true;
                $scope.resultsShown = true;
                dataServ.persistResults = recipes.data
                return $scope.recipeResults = recipes.data
            }
            dataServ.persistResults = recipes.data
            return $scope.recipeResults = recipes.data
        })
    }

    $scope.decrementOffset = () => {
        $scope.offset -= 12
        dataServ.searchRecipeBasic($scope.humanQuery, $scope.offset).then((result) => {
            if (result.data[0].id === $scope.firstResult) {
                $scope.showPreviousButton = false;
            }
            if (!result.data.length) {
                $scope.resultsShown = false;
                return $scope.noResults = true;
            } else if (result.data.length) {
                $scope.showPreviousButton = false;
                $scope.resultsShown = true;
                dataServ.persistResults = result.data
                return $scope.recipeResults = result.data
            }
            dataServ.persistResults = result.data
            return $scope.recipeResults = result.data
        })
    }

})