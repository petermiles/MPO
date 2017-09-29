angular.module('MPOApp').controller('dataCtrl', function ($scope, dataServ) {

	//Generative Functions
	$scope.generateMealPlan = function(cal,time) {
		console.log("test")
		dataServ.generateMealPlan(cal,time).then( (mealPlan) => {
			$scope.mealPlans = mealPlan	
		})
	}


	$scope.searchRecipeBasic = function(humanQuery, diet, badIng, reqInstr, intol, limit, recType) {
		dataServ.searchRecipeBasic(humanQuery, diet, badIng, reqInstr, intol, limit, recType).then((recipeResults) => {
			$scope.recipeResults = recipeResults
		})
	}
})

