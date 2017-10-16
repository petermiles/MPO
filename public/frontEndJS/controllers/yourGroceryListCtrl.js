angular.module('MPOApp').controller('yourGroceryListCtrl', function($scope, userServ, $stateParams, groceryListServ) {
    let id = $stateParams.id

    groceryListServ.getItemsInList(id).then(result => {
        if (!result.data.length) {
            $scope.noItemsHero = true;
            return $scope.noItemsHero
        } else if (result.data) {
        	$scope.noItemsHero = false;
            $scope.groceryList = JSON.parse(result.data[0].items)
        }
    })

    // $scope.groceryList = groceryItems

    $scope.pageId = $stateParams.id


})