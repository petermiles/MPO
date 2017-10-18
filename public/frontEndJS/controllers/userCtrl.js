angular.module('MPOApp').controller('userCtrl', function($scope, userServ, mealPrepServ, $stateParams) {
    $scope.showSignUp = true;
    $scope.showSignIn = true;
    $scope.showSignOut = false;
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $scope.showSignOut = true;
            $scope.showSignUp = false;
            $scope.showSignIn = false;
            return user
        }
    })


    $scope.userInfo = userServ.userInfo
    $scope.createUser = userServ.createUser
    $scope.signIn = (email, password) => {
        userServ.signIn(email, password)
            .then(result => {
                console.log(result)
            }).catch(error => {
                console.log(error)
            })
    }
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
                $(".modal-backdrop").hide();
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

    $scope.getMealPlans = () => {
        mealPrepServ.getMealPlans().then(result => {
            $scope.mealPlans = result.data
        })
    }

})