angular.module('MPOApp').controller('recipeBooksCtrl', function($scope, userServ, $stateParams, recipes) {
    console.log(recipes)

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })

    $scope.recipes = recipes.data

    $scope.deleteRecipeFromBook = (id,fkey) => {
    	userServ.deleteRecipeFromBook(id,fkey)
    	.then(result => {
    		return $scope.recipes = result.data
    	})
    }
})