angular.module('MPOApp').controller('yourGroceryListCtrl', function($scope, userServ, $stateParams, groceryListServ) {
	let id = $stateParams.id

	console.log(id)
	groceryListServ.getItemsInList(id).then(result => {
		console.log(id)
		let data = JSON.parse(result.data[0].items)
		$scope.groceryList = data
	})
		


    // $scope.groceryList = groceryItems

    $scope.pageId = $stateParams.id


})