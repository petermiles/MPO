angular.module("MPOApp").service("userServ", function($http) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            this.user = user
        };
    })

    this.createUser = (firstName, lastName, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userInfo = [user.uid, user.email, firstName, lastName]
            console.log(userInfo)
            return $http.post('/users/createUser', userInfo)
        })
    }

    this.signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { console.log("logged in") })
    }

    this.signOut = () => {
        firebase.auth().signOut().then(() => {
            console.log(uid, 'Signed Out');
        })
    }

    this.createRecipeBook = (name) => {
        var id = [name, this.user.uid]
        console.log(id, "info to be passed")
        return $http.post(`/users/createRecipeBook`, id)
    }

    this.getRecipeBooks = (user) => {
        let id = this.user.uid;
        return $http.get(`/users/getRecipeBooks/${id}`, id)
            .then((result) => books = result)
            .then((books) => console.log(books))
    }
})