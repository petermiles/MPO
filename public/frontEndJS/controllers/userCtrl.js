angular.module('MPOApp').controller('userCtrl', function($scope, userServ, mealPrepServ, $stateParams, $state) {
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

    // userServ.userInfo()
    $scope.createUser = userServ.createUser;
    $scope.signIn = (email) => {
        let password = $scope.passwordSignIn
        console.log(email, password)
        userServ.signIn(email, password).then(result => {
            $state.go('search')
        })
    }
    $scope.signOut = () => {
        userServ.signOut().then(result => {
            $scope.signOut = true;;
            $scope.signIn = true;
            $state.go('home')
        })
    }

    $scope.signInAsGuest = userServ.signInAsGuest

    $scope.loginWithPhoneNumber = userServ.loginInWithPhoneNumber

})