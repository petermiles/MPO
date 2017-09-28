angular.module('MPOApp').controller('dataCtrl', function ($scope, dataServ) {

	//Generative Functions
	$scope.generateMealPlan = function(cal,time) {
		dataServ.generateMealPlan(cal,time).then( (response) => {
			$scope.mealPlans = response.data
		})
		
	}


	//Straight buku shit
	

})