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



        return $scope.recipeData = result.data
    }).then(result => {
        dataServ.parseIngredients([result.extendedIngredients, result.servings])
            .then(result => {
                $scope.nutrition = result
                return $scope.nutrition
            })
    })

    $scope.createGroceryList = () => {
        groceryListServ.createGroceryList.then(result => {
            console.log(result)
            $scope.booksExist = true
        })
    }


    $scope.saveRecipeToBook = (title, recipeId, image, id, pricePerServing) => {
        userServ.saveRecipeToBook(title, recipeId, image, id, (pricePerServing * 100), $scope.nutrition)
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