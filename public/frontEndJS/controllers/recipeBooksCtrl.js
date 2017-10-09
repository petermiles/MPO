angular.module('MPOApp').controller('recipeBooksCtrl', function($scope, userServ, $stateParams, recipes) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
            console.log(user)
        };
    })

    $scope.pageTitle = $stateParams.id
    $scope.recipes = recipes.data

    $scope.deleteRecipeFromBook = (id,fkey) => {
    	userServ.deleteRecipeFromBook(id,fkey)
    	.then(result => {
    		return $scope.recipes = result.data
    	})
    }

    $scope.deleteBook = () => {
        console.log("test")
    }
})