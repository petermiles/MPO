angular.module("MPOApp").service("userServ", function($http) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
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
        return $http.post(`/users/createRecipeBook`, id)
        .then(result => {return result})
    }

    this.getRecipeBooks = (user) => {
        let id = this.user.uid;
        return $http.get(`/users/getRecipeBooks/${id}`, id)
            .then((result) => {return result})
    }

    this.deleteBook = (bookId) => {
        let books = [bookId, this.user.uid]
        console.log(books)
        return $http.post(`/users/deleteBook`, books)
            .then((result) => {return result})
    }

    this.saveRecipeToBook = (title, recipeId, image, id) => {
        let recipe = [title, recipeId, image, id]
        return $http.post(`/users/saveRecipe`, recipe)
    }

    this.getRecipesFromBooks = (id) => {
        return $http.get(`/users/getRecipesFromBooks/${id}`)
        .then(result => {
            return result
        })
    }

    this.deleteRecipeFromBook = (id, fkey) => {
        let deleteId = [id.toString(), fkey.toString()]
        return $http.post('/users/deleteRecipeFromBook', deleteId)
        .then(result => {
            return result
        })
    }
})