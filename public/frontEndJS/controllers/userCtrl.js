angular.module('MPOApp').controller('userCtrl', function($scope, userServ, mealPrepServ, dataServ, $stateParams, $state) {
    $scope.misMatchingPasswords = false;
    $scope.showSignOut = true;
    firebase.auth().onAuthStateChanged(user => {
        console.log(user)
        if (!user) {
            $scope.showSignOut = false
            $scope.showSignIn = true;
        }
        else if (user) {
            $scope.showSignOut = true;
            $scope.showSignUp = false;
            $scope.showSignIn = false;
            return user
        }
    })

    dataServ.getRandomRecipes().then(result => {
        $scope.randomRecipes = result
    })

    // userServ.userInfo()
    $scope.createUser = (signUpName, signUpEmail, initialPassword, signUpPassword) => {
        if (initialPassword !== signUpPassword) {
            $scope.misMatchingPasswords = true;
        } else if (initialPassword === signUpPassword) {
            userServ.createUser(signUpName, signUpEmail, signUpPassword).then(result => {
                console.log(result)
            })
        }
    }

    $scope.signIn = (email) => {
        let password = $scope.loginPassword
        console.log(email, password)
        userServ.signIn(email, password).then(result => {
            $('#loginModal').modal('toggle')
            $state.go('search')
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
            $route.reload()
        })
    }

    $scope.signInAsGuest = userServ.signInAsGuest

    $scope.loginWithPhoneNumber = userServ.loginInWithPhoneNumber

})