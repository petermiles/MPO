angular.module('MPOApp').controller('recipeCtrl', function($scope, dataServ, $stateParams, userServ, recipeServ, groceryListServ) {

    $scope.groceryListExist = true;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
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
        console.log(result.data)
        $scope.diets = result.data.diets.join(', ').replace(/,(?!.*,)/gmi, ' and');
        $scope.stepsLength = result.data.analyzedInstructions[0].steps.length
        $scope.ingredientLength = result.data.extendedIngredients.length
        $scope.pricePerServing = (result.data.pricePerServing / 100).toFixed(2)
        $scope.recipeIngredients = result.data.extendedIngredients
        $scope.recipeInstructions = result.data.analyzedInstructions[0].steps
        /////////////////////



        return $scope.recipeData = result.data
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