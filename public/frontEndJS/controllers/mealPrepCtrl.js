angular.module('MPOApp').controller('mealPrepCtrl', function($scope, mealPrepServ) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })


})