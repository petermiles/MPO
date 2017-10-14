angular.module('MPOApp').controller('recipeCtrl', function($scope, dataServ, $stateParams, userServ, recipeServ, groceryListServ) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
    })

    $scope.getGroceryLists = () => {
        groceryListServ.getGroceryLists().then(result => {
            return $scope.groceryLists = result.data
        })
    }

    $scope.saveToGroceryList = (id, data) => {
        groceryListServ.groceryListDataManipulation(id, data)
        // groceryListServ.saveItemsToGroceryList(id, data)
    }

    dataServ.getRecipeInfo($stateParams.id).then((result) => {
        console.log(result.data)
        $scope.diets = result.data.diets.join(', ').replace(/,(?!.*,)/gmi, ' and');
        $scope.stepsLength = result.data.analyzedInstructions[0].steps.length
        $scope.ingredientLength = result.data.extendedIngredients.length
        $scope.pricePerServing = (result.data.pricePerServing / 100).toFixed(2)
        $scope.recipeIngredients = result.data.extendedIngredients
        $scope.recipeInstructions = result.data.analyzedInstructions[0].steps
        /////////////////////


        // dataServ.parseIngredients = dataServ.parseIngredients($scope.recipeIngredients)
        return $scope.recipeData = result.data
    })



    $scope.saveRecipeToBook = (title, recipeId, image, id) => {
        userServ.saveRecipeToBook(title, recipeId, image, id)
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