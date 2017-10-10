angular.module('MPOApp').controller('mealPrepCtrl', function($scope, mealPrepServ, $stateParams, userServ) {

	$scope.getRecipeBooks = () => {
		userServ.getRecipeBooks().then(result => {
			$scope.recipeBooks = result.data
		})
	}
	$scope.pageTitle = $stateParams.id 

})