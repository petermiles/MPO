angular.module('MPOApp').controller('dataCtrl', function ($scope, dataServ) {

	//Generative Functions
	$scope.generateMealPlan = function(cal,time) {
		dataServ.generateMealPlan(cal,time).then( (mealPlan) => {
			$scope.mealPlans = mealPlan	
		})
	}


	$scope.searchRecipeBasic = function(humanQuery, diet, badIng, reqInstr, intol, limit, recType) {
		dataServ.searchRecipeBasic(humanQuery, diet, badIng, reqInstr, intol, limit, recType).then((recipes) => {
			console.log(recipes)
			return $scope.recipeResults = recipes.data
		})
	}

})