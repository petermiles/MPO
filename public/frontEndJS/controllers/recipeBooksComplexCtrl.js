angular.module('MPOApp').controller('recipeBooksComplexCtrl', function($scope, userServ, $stateParams, recipes) {

    
    if (!recipes.data.length) {
        $scope.noBooks = true
    } else if (recipes.data.length) {
        $scope.recipes = recipes.data
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })


    $scope.deleteRecipeFromBook = (id, fkey) => {
        userServ.deleteRecipeFromBook(id, fkey)
            .then(result => {
                if (!result.data.length) {
                    $scope.noBooks = true
                } else if (result.data.length) {
                    $scope.recipes = recipes.data
                }
                return $scope.recipes = result.data
            })
    }
})