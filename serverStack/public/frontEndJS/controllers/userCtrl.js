angular.module('MPOApp').controller('userCtrl', function($scope, userServ, mealPrepServ, dataServ, $stateParams, $state) {
    $scope.showRandomRecipes = false;
    $scope.misMatchingPasswords = false;
    $scope.showSignOut = true;
    $scope.showMyItems = true;
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            $scope.showSignOut = false
            $scope.showSignIn = true;
            $scope.showMyItems = false;
        } else if (user) {
            $scope.showMyItems = true;
            $scope.showSignOut = true;
            $scope.showSignUp = false;
            $scope.showSignIn = false;
            return user
        }
    })

    dataServ.getRandomRecipes().then(result => {
        $scope.showRandomRecipes = true;
        $scope.randomRecipes = result
    })

    // userServ.userInfo()
    $scope.createUser = (signUpName, signUpEmail, initialPassword, signUpPassword) => {
        if (initialPassword !== signUpPassword) {
            $scope.misMatchingPasswords = true;
        } else if (initialPassword === signUpPassword) {
            $('#loginModal').modal('toggle')
            userServ.createUser(signUpName, signUpEmail, signUpPassword).then(result => {
                return result
            })
        }
    }

    $scope.signIn = (email) => {
        let password = $scope.loginPassword
        console.log(email, password)
        userServ.signIn(email, password).then(result => {
            $('#loginModal').modal('toggle')
            $route.reload()
            $scope.showMyItems = true;
            $scope.showSignIn = true;
            $scope.showSignOut = false;

        }).catch(error => {
            console.log(error)
        })
    }
    $scope.signOut = () => {
        userServ.signOut().then(result => {
            $scope.signOut = false;
            $scope.signIn = true;
            // $location.path('/reload')
            $route.reload()
        })
    }

    $scope.signInAsGuest = userServ.signInAsGuest

    $scope.loginWithPhoneNumber = userServ.loginInWithPhoneNumber

})