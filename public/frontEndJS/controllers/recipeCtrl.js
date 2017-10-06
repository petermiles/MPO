angular.module('MPOApp').controller('recipeCtrl', function($scope, dataServ, $stateParams) {

    dataServ.getRecipeInfo($stateParams.id).then((result) => {
        console.log(result)

        $scope.diets = result.data.diets.join(', ').replace(/,(?!.*,)/gmi, ' and');
        $scope.stepsLength = result.data.analyzedInstructions[0].steps.length
        $scope.ingredientLength = result.data.extendedIngredients.length
        $scope.pricePerServing = (result.data.pricePerServing / 100).toFixed(2)


       //  	let ingredients = result.data.extendedIngredients
       //  	let ingArr = [];
       //  	for (let i = 0; i < ingredients.length; i++) {
    			// ingArr.push(ingredients[i].name)
       //  	}
        // $scope.recipeIngredients = ingArr

        $scope.recipeIngredients = result.data.extendedIngredients

        $scope.recipeInstructions = result.data.analyzedInstructions[0].steps

        return $scope.recipeData = result.data
    })

    // dataServ.visualizeReciptCost($stateParams.id).then(result => {
    // 	console.log(result)
    // })
})