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
            .then(result => { return result })
    }

    this.getRecipeBooks = (user) => {
        let id = this.user.uid;
        return $http.get(`/users/getRecipeBooks/${this.user.uid}`)
            .then((result) => { return result })
    }

    this.deleteBook = (bookId) => {
        let books = [bookId, this.user.uid]
        console.log(books)
        return $http.post(`/users/deleteBook`, books)
            .then((result) => { return result })
    }

    this.saveRecipeToBook = (title, recipeId, image, id, pricePerServing, nutrition, data) => {
        let servings = data.servings
        let nutritionData = JSON.stringify(nutrition[0])
        let thumbnail = `https://spoonacular.com/recipeImages/${recipeId}-240x150.jpg`
        let recipe = [title, recipeId, image, id, thumbnail, pricePerServing, nutritionData]
        return $http.post(`/users/saveRecipe`, recipe).then(result => {
            return result.data
        }).then((result) => {
            let recipeSearch = [recipeId]
            return $http.post('/users/getRecipeNutrition').then(result => {
                let pulledData = result.data
                let tempArr = []
                _.mapObject(pulledData, x => {
                    _.map(x, y => {
                        tempArr.push(x.recipe_id)
                    })
                })
                let uniqueArr = _.uniq(tempArr)
                console.log(uniqueArr)
                if (uniqueArr.length) {
                    for (var i = 0; i < uniqueArr.length; i++) {
                        console.log(uniqueArr[i])
                        if (uniqueArr[i] === recipeId) {
                            console.log("same recipe found")
                            // return false
                            // console.log("same")
                            let existingNutritionObj = {}
                            _.mapObject(nutrition[0], x => {
                                let title = recipeId
                                let amount = (x.amount / servings)
                                let podn = (x.percentOfDailyNeeds * 10)
                                let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
                                // return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
                                let existingNutritionObj = {
                                    title: recipe[0],
                                    recipeId: recipe[1],
                                    image: recipe[2],
                                    thumbnail: recipe[3],
                                    pricePerServing: recipe[4],
                                    nutrition: result.data
                                }
                                // console.log(existingNutritionObj)
                                return existingNutritionObj



                            })
                        } else if (uniqueArr[i] !== recipeId) {
                            console.log("different recipe")
                        }

                        // _.mapObject(nutrition[0], x => {
                        //     let amount = (x.amount / servings)
                        //     let podn = (x.percentOfDailyNeeds * 10)
                        //     let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
                        //     console.log()
                        //     return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
                        //         let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
                        //         console.log(existingNutritionObj)
                        //         return existingNutritionObj
                        //     })
                        // })

                        // console.log("different")
                        // let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
                        // return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
                        //     let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
                        //     console.log(existingNutritionObj)
                        //     return existingNutritionObj
                        // })

                        // console.log(existingNutritionObj)
                        // return existingNutritionObj
                    }
                } else if (!uniqueArr.length) {
                    _.mapObject(nutrition[0], x => {
                        let amount = (x.amount / servings)
                        let podn = (x.percentOfDailyNeeds * 10)
                        let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
                        console.log()
                        return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
                            let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
                            console.log(existingNutritionObj)
                            return existingNutritionObj
                        })
                    })
                }

            })
        })
    }

    this.saveRecipeNutrition = (nutrition, id) => {

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