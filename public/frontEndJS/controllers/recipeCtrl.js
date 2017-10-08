angular.module('MPOApp').controller('recipeCtrl', function($scope, dataServ, $stateParams, userServ, recipeServ) {
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
    })

    dataServ.getRecipeInfo($stateParams.id).then((result) => {
        console.log(result)

        $scope.diets = result.data.diets.join(', ').replace(/,(?!.*,)/gmi, ' and');
        $scope.stepsLength = result.data.analyzedInstructions[0].steps.length
        $scope.ingredientLength = result.data.extendedIngredients.length
        $scope.pricePerServing = (result.data.pricePerServing / 100).toFixed(2)
        $scope.recipeIngredients = result.data.extendedIngredients
        $scope.recipeInstructions = result.data.analyzedInstructions[0].steps
        // Use business logic to remove step if it doesn't have text (service is set up)
        return $scope.recipeData = result.data
    })
    

    $scope.saveRecipeToBook = (title, recipeId, image, id) => {
        userServ.saveRecipeToBook(title, recipeId, image, id)
        .then(result => {
            console.log("SUCCESS")
        })
    }

    $scope.getRecipeBooksModal = (user) => {
        userServ.getRecipeBooks(user).then(result => {
            return $scope.userBooksModal = result.data
        })
    }

    // dataServ.visualizeReciptCost($stateParams.id).then(result => {
    //  console.log(result)
    // })
})