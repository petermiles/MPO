angular.module('MPOApp').controller('recipeBooksCtrl', function($scope, userServ, $stateParams) {



    userServ.userInfo().then(result => {
        $scope.userName = result
    })

    $scope.createRecipeBook = (name) => {
        userServ.createRecipeBook(name)
            .then(result => {
                return $scope.userBooks = result.data
            })
    }

    userServ.getRecipeBooks()
        .then(result => {
            return $scope.userBooks = result[0]
        })

    $scope.deleteBook = (bookId) => {

        userServ.deleteBook(bookId)
            .then((result) => {
                $(".modal-backdrop").hide();
                return $scope.userBooks = result.data
            })
    }

})