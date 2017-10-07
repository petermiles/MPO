angular.module('MPOApp').controller('userCtrl', function($scope, userServ) {

	
	
    $scope.userInfo = userServ.userInfo
    $scope.createUser = userServ.createUser
    $scope.signIn = userServ.signIn
    $scope.signOut = userServ.signOut

    $scope.createRecipeBook = userServ.createRecipeBook
    $scope.getRecipeBooks = userServ.getRecipeBooks

    $scope.recipeBooks = userServ.recipeBooks
})