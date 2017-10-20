angular.module('MPOApp').controller('recipeCtrl', function($scope, dataServ, $stateParams, userServ, recipeServ, groceryListServ) {
    $scope.recipeResultsShow = false;
    $scope.loadingIconShow = false;
    $scope.groceryListExist = false;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
    })

    userServ.userInfo().then(result => {
       $scope.userName = result
    })


    $scope.getGroceryLists = () => {
        groceryListServ.getGroceryLists().then(result => {
            if (!result.data.length) {
                $scope.groceryListExist = true;
            }
            return $scope.groceryLists = result.data
        })
    }

    $scope.saveToGroceryList = (id, data) => {
        groceryListServ.groceryListDataManipulation(id, data)
    }

    $scope.createGroceryList = (name) => {
        groceryListServ.createGroceryList(name).then(result => {
            $scope.groceryListExist = false;
            $scope.groceryLists = result.data
        })
    }

    dataServ.getRecipeInfo($stateParams.id).then((result) => {
        $scope.loadingIconShow = true;
        $scope.recipeResultsShow = true;
        $scope.diets = result[0].data.diets.join(', ').replace(/,(?!.*,)/gmi, ' and');
        $scope.stepsLength = result[0].data.analyzedInstructions[0].steps.length
        $scope.ingredientLength = result[1].length
        $scope.pricePerServing = (result[0].data.pricePerServing / 100).toFixed(2)
        $scope.recipeIngredients = result[0].data.extendedIngredients
        $scope.recipeInstructions = result[1]
        return $scope.recipeData = result[0].data
    })

    $scope.saveRecipeToBook = (title, recipeId, image, id, pricePerServing, data) => {
        let ingredients = $scope.recipeData.extendedIngredients
        dataServ.parseIngredients(ingredients).then(result => {
            userServ.saveRecipeToBook(title, recipeId, image, id, pricePerServing, result, data)
        })

    }





    $scope.booksExist = true;
    $scope.createRecipeBook = (name) => {
        userServ.createRecipeBook(name).then(result => {
            $scope.booksExist = true
            $scope.userBooksModal = result.data
        })
    }
    $scope.getRecipeBooksModal = (user) => {
        userServ.getRecipeBooks(user).then(result => {
            if (!result.data.length) {
                $scope.booksExist = false
            }
            return $scope.userBooksModal = result.data
        })
    }
})