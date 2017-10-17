angular.module('MPOApp').controller('yourGroceryListCtrl', function($scope, userServ, $stateParams, groceryListServ, dataServ) {
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

    $scope.deleteItemFromGroceryList = (data) => {
        groceryListServ.deleteItemFromGroceryList(id, data).then(result => {
            $scope.groceryList = result[1]
        })
    }

    $scope.parseGroceryListSearch = (text) => {
        dataServ.parseGroceryListSearch(text)
    }

    $scope.pageId = $stateParams.id


})