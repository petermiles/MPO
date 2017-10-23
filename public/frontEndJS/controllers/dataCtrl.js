angular.module('MPOApp').controller('dataCtrl', function($scope, $stateParams, dataServ, $state, $location, $rootScope) {
    $scope.offset = 0
    $scope.resultsShown = false;
    $scope.showPreviousButton = false;
    $scope.showNextButton = false;

    $scope.homePageSearch = (query) => {
        $state.go('search', { searchValue: query })
        $scope.humanQuery = query
        $stateParams.searchValue = query

        return dataServ.searchRecipeBasic(query, $scope.offset)
            .then(result => {
                console.log(result)
                $scope.resultsShown = true;
                dataServ.persistResults = result.data
                return $rootScope.recipeResults = result.data
            })
    }

    $scope.texttyping = [
        "Show me Gluten Free Chicken Recipes",
        "Show me Low Fat Yogurt Recipes",
        "Show me Deep Fried Butter",
        "Show me Curry With No Onions",
        "Show me Low Fat Steak",
        "Show me Banana Deserts",
        "Show me Some Good Food"
    ]


    dataServ.persistResults ? $scope.recipeResults = dataServ.persistResults : null

    //Generative Functions

    $scope.searchRecipeBasic = function(searchQuery) {
        dataServ.searchRecipeBasic(searchQuery, $scope.offset).then((result) => {

            if (result.data.length <= 12) {
                $scope.humanQuery = searchQuery
                $scope.showNextButton = false;
            }
            if (result.data.length > 12) {
                $scope.resultsShown = true;
                $scope.showNextButton = true;
            }
            if (result.data.length === 0) {
                $scope.resultsShown = false;
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