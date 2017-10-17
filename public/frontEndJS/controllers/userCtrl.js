angular.module('MPOApp').controller('userCtrl', function($scope, userServ, mealPrepServ, $stateParams) {
    $scope.showSignUp = true;
    $scope.showSignIn = true;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user)
            $scope.showSignUp = false;
            $scope.showSignIn = false;
            return user
        }
    })

    $scope.userInfo = userServ.userInfo
    $scope.createUser = userServ.createUser
    $scope.signIn = userServ.signIn
    $scope.signOut = userServ.signOut

    $scope.loginWithPhoneNumber = userServ.loginInWithPhoneNumber

    $scope.createRecipeBook = (name) => {
        userServ.createRecipeBook(name)
            .then((result => {
                return $scope.userBooks = result.data
            }))
    }
    $scope.getRecipeBooks = () => {
        userServ.getRecipeBooks()
            .then(result => {
                return $scope.userBooks = result.data
            })
    }

    $scope.deleteBook = (bookId) => {
        userServ.deleteBook(bookId)
            .then((result) => {
                return $scope.userBooks = result.data
            })
    }

    $scope.createMealPlan = (name, notes) => {
        mealPrepServ.createMealPlan(name, notes).then(result => {
            $scope.mealPlans = result.data
        })
    }

    $scope.deleteMealPlan = (planId) => {
        mealPrepServ.deleteMealPlan(planId).then(result => {
            $scope.mealPlans = result.data
        })
    }

    $scope.getMealPlans = (id) => {
        mealPrepServ.getMealPlans(id).then(result => {
            $scope.mealPlans = result.data
        })
    }

})