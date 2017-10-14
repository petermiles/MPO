angular.module('MPOApp').controller('groceryListCtrl', function($scope, userServ, $stateParams, groceryListServ) {

	// console.log(groceryItems)
	$scope.pageId = $stateParams.id

	$scope.createGroceryList = (name) => {
		groceryListServ.createGroceryList(name).then(result => {
			$scope.groceryLists = result.data
		})
	}

	$scope.getGroceryLists = () => {
		groceryListServ.getGroceryLists().then(result => {
			$scope.groceryLists = result.data
		})
	}

	$scope.deleteGroceryList= (listId) => {
		groceryListServ.deleteGroceryList(listId).then(result => {
			$scope.groceryLists = result.data
		})
	}

	

})