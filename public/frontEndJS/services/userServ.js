angular.module("MPOApp").service("userServ", function($http, $state) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
    })

    this.createUser = (firstName, lastName, email, password) => {
        console.log(firstName, lastName, email, password)
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userInfo = [this.user.uid, this.user.email, firstName, lastName]
            return $http.post('/users/createUser', userInfo)
        }).catch(err => {
            console.log(err.message)
        })
    }

    this.userInfo = () => {
        let userId = this.user.uid;
        return $http.get(`/users/getUserInfo/${userId}`).then(result => {
            let name = result.data[0].first_name
            var firstLetter = name.substr(0, 1);
            let fixedName = firstLetter.toUpperCase() + name.substr(1);
            return fixedName
        })
    }

    this.signIn = (email, password) => {
        console.log(email, password)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                $state.go('search')
            }).catch(error => {
                console.log(error.code)
            })
    }

    this.signInAsGuest = () => {
        firebase.auth().signInAnonymously().then(user => {
                console.log(user)
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    this.signOut = () => {
        firebase.auth().signOut()
    }

    this.createRecipeBook = (name) => {
        var id = [name, this.user.uid]
        return $http.post(`/users/createRecipeBook`, id)
            .then(result => { return result })
    }

    this.getRecipeBooks = () => {
        let id = this.user.uid
        return $http.get(`/users/getRecipeBooks/${id}`)
            .then((result) => {
                let resultData = [result.data, []]
                resultData[0].map(x => {
                    resultData[1].push(x.id)
                })
                let resultDataFinal = [resultData[0],
                    []
                ]
                return resultData
            }).then(recipes => {
                // // let recipesObj = {}
                // // _.map(recipes[1], (x, y) => {

                // //     recipesObj[x] = x
                // // })  
                // let recipesArr = []
                // for (var i = 0; i < recipes[1].length; i++) {
                //     let bookId = recipes[1][i]
                //     $http.get(`/users/getRecipesFromBooks/${bookId}`).then(result => {
                //         if(result.data.length){
                //             $http.post('/users/savePicsFromRecipeBook', userPics)
                //         }
                //         // let length = result.data.length
                //         // let index = i
                //         // console.log(index)
                //         // console.log(recipes[0])
                //         // if (!result.data.length) {
                //         //     recipesArr.push({id : recipes[1][index]})
                //         // } else if (result.data.length > 0) {
                //         //     let y = Math.ceil(Math.random() * length)
                //         //     _.map(result.data, x, y=> {
                //         //         if (!result.data.length) {
                //         //             recipesArr.push({ id: x.fkey, pic: 'http://bigapplecurry.files.wordpress.com/2012/11/istock_000019639558_medium.jpg'})
                //         //         } else if(result.data.length){
                //         //             recipesArr.push({ id: x.fkey, pic: x.profile_pic })
                //         //         }
                //         //     })
                //         // }
                //     })
                // }
                // // console.log(recipesArr)
                return recipes
            })

    }

    this.getRecipesFromBooks = (id) => {
        console.log("test")
        return $http.get(`/users/getRecipesFromBooks/${id}`)
            .then(result => {
                return result
            })
    }

    this.deleteBook = (bookId) => {
        let books = [bookId, this.user.uid]
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
        }).then(result => {
            console.log(result, id)
            let userId = this.user.uid
            let recipePic = [result[0].fkey,result[0].profile_pic]
            return $http.get(`/users/getRecipeBooks/${userId}`).then(response => {
                console.log(response)
                // let existingPics = result.data.recipe_
            })
        })

        // .then((result) => {
        //     let recipeSearch = [recipeId]
        //     return $http.post('/users/getRecipeNutrition').then(result => {
        //         let pulledData = result.data
        //         let tempArr = []
        //         _.mapObject(pulledData, x => {
        //             _.map(x, y => {
        //                 tempArr.push(x.recipe_id)
        //             })
        //         })
        //         let uniqueArr = _.uniq(tempArr)
        //         console.log(uniqueArr)
        //         if (uniqueArr.length) {
        //             for (var i = 0; i < uniqueArr.length; i++) {
        //                 console.log(uniqueArr[i])
        //                 if (uniqueArr[i] === recipeId) {
        //                     console.log("same recipe found")
        //                     // return false
        //                     // console.log("same")
        //                     let existingNutritionObj = {}
        //                     _.mapObject(nutrition[0], x => {
        //                         let title = recipeId
        //                         let amount = (x.amount / servings)
        //                         let podn = (x.percentOfDailyNeeds * 10)
        //                         let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
        //                         // return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
        //                         let existingNutritionObj = {
        //                             title: recipe[0],
        //                             recipeId: recipe[1],
        //                             image: recipe[2],
        //                             thumbnail: recipe[3],
        //                             pricePerServing: recipe[4],
        //                             nutrition: result.data
        //                         }
        //                         // console.log(existingNutritionObj)
        //                         return existingNutritionObj



        //                     })
        //                 } else if (uniqueArr[i] !== recipeId) {
        //                     console.log("different recipe")
        //                 }

        //                 // _.mapObject(nutrition[0], x => {
        //                 //     let amount = (x.amount / servings)
        //                 //     let podn = (x.percentOfDailyNeeds * 10)
        //                 //     let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
        //                 //     console.log()
        //                 //     return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
        //                 //         let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
        //                 //         console.log(existingNutritionObj)
        //                 //         return existingNutritionObj
        //                 //     })
        //                 // })

        //                 // console.log("different")
        //                 // let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
        //                 // return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
        //                 //     let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
        //                 //     console.log(existingNutritionObj)
        //                 //     return existingNutritionObj
        //                 // })

        //                 // console.log(existingNutritionObj)
        //                 // return existingNutritionObj
        //             }
        //         } else if (!uniqueArr.length) {
        //             _.mapObject(nutrition[0], x => {
        //                 let amount = (x.amount / servings)
        //                 let podn = (x.percentOfDailyNeeds * 10)
        //                 let recipeNutrition = [recipeId, x.title, amount, x.unit, x.percentOfDailyNeeds]
        //                 return $http.post('/users/saveRecipeNutrition', recipeNutrition).then(result => {
        //                     let existingNutritionObj = { title: recipe[0], recipeId: recipe[1], image: recipe[2], thumbnail: recipe[3], pricePerServing: recipe[4], nutrition: result.data }
        //                     return existingNutritionObj
        //                 })
        //             })
        //         }

        //     })
        // })
    }

    this.saveRecipeNutrition = (nutrition, id) => {

    }

    this.getRecipesFromBooks = (id) => {
        console.log("test")
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