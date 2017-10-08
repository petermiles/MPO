angular.module("MPOApp").constant("user", firebase.auth().onAuthStateChanged(user => {
        if (user) {
            return user
        };
    }))