angular.module('MPOApp').controller('groceryListCtrl', function($scope, userServ, $stateParams, groceryListServ, user) {
    $scope.pageId = $stateParams.id;

    userServ.userInfo().then(result => {
        $scope.userName = result
    })
    $scope.createGroceryList = (name) => {
        groceryListServ.createGroceryList(name).then(result => {
            $scope.groceryLists = result.data
        })
    }

    let id = user.currentUser.uid
    groceryListServ.getGroceryLists(id).then(result => {
        $scope.groceryLists = result.data
    })

    $scope.deleteGroceryList = (listId) => {
        groceryListServ.deleteGroceryList(listId).then(result => {
            $('#confirmDeleteModal').modal('toggle');
            $state.go($state.current, {}, { reload: true })
            return $scope.groceryLists = result.data
        })
    }



})