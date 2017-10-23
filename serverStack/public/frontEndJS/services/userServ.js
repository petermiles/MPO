angular.module("MPOApp").service("userServ", function($http, $state) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        }
    })

    this.createUser = (firstName, email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
            let userInfo = [user.uid, user.email, firstName]
            return $http.post('/users/createUser', userInfo)
        }).catch(error => {
            if (error.code === 'auth/argument-error') {
                alert("Either password or email is messed up")
            } else if (error.code === 'auth/weak-password') {
                alert("password must be 6 characters")
            }
        })
    }

    this.userInfo = () => {
        let userId = this.user.uid;
        console.log(userId)
        return $http.get(`/users/getUserInfo/${userId}`).then(result => {
            console.log(result)
            let name = result.data[0].first_name
            var firstLetter = name.substr(0, 1);
            let fixedName = firstLetter.toUpperCase() + name.substr(1);
            return fixedName
        })
    }

    this.signIn = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result) => {
                $('#loginModal').modal('toggle')
                $state.reload()
                return result
                // $state.go('search')
            }).catch(error => {
                console.log(error)
                if (error.code === "auth/invalid-email") {
                    alert("Bad Email")
                } else if (error.code === "auth/user-not-found") {
                    alert('Email does not exist')

                } else if (error.code === "auth/wrong-password") {
                    alert('wrong password')
                }
            })
    }

    this.signInAsGuest = () => {
        firebase.auth().signInAnonymously().then(user => {
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    this.signOut = () => {
        firebase.auth().signOut().then(result => {
            $state.go('home')
        })
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
            })

            .then(recipes => {
                let recipeIds = recipes[1]
                let recipesArr = []
                let picObj = {}
                for (let i = 0; i < recipeIds.length; i++) {
                    let bookId = recipeIds[i]
                    $http.get(`/users/getRecipesFromBooks/${bookId}`).then(result => {
                        _.map(result.data, x => {
                            let id = x.fkey
                            if (!picObj[id]) {
                                picObj[id] = [x.profile_pic];
                                picObj[id].id = id
                            } else if (picObj[id]) {
                                picObj[id].push(x.profile_pic)
                            }
                        })

                        return picObj
                    }).then(pics => {
                        let index = i;
                        _.map(recipes[0], x => {
                            _.map(pics, y => {
                                let length = y.length
                                let item = y[Math.floor(Math.random() * y.length)]
                                if(y.id === x.id){
                                    x.picture = item
                                }
                            })
                        })
                    })
                }
                return recipes
            })

    }

    this.getRecipesFromBooks = (id) => {
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
            let recipePic = [result[0].fkey, result[0].profile_pic]
            return $http.get(`/users/getRecipeBooks/${userId}`).then(response => {
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