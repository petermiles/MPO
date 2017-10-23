angular.module("MPOApp").service("dataServ", function($http) {

    this.generateMealPlan = (calories, time) => {

        return $http.get(`/search/mealplan/?targetCalories=${calories}&timeFrame=${time}`).then(response => {
            time = time.toLowerCase();
            if (time === "week") {
                return response.data.items
            } else if (time === "day") {
                return response.data.meals
            }
        })
    }

    this.getRandomRecipes = () => {
        return $http.get('/search/getRandomRecipes').then(result => {
            return result.data
        })
    }

    this.parseGroceryListSearch = (text) => {
        return $http.post('/search/parseGroceryListSearch', [text])
            .then(result => {
                return result
            })
    }

    this.searchRecipeBasic = (humanQuery, offset) => {
        let params = ['?'];
        params.push(`query=${humanQuery}`)
        params.push(`&instructionsRequired=true`)
        params.push(`&offset=${offset}`)
        params.push(`&number=12`)
        let searchQueries = params.join('')
        return $http.put(`/search/recipeBasic/`, { searchQueries })
            .then(response => {
                 return response
            })
    }

    this.persistResults;

    this.parseIngredients = (data) => {
        let servings = data[1]
        let ingredientInfo = []

        _.mapObject(data, x => {
            let unit = x.unitLong
            ingredientInfo.push({
                "amount": x.amount,
                "unit": (function() {
                    if (x.unitLong.charAt(x.unitLong.length - 1) === "s") {
                        let unit = x.unitLong.substring(0, x.unitLong.length - 1)
                        return unit
                    } else if (x.unitLong.charAt(x.unitLong.length - 1) !== "s") {
                        return unit
                    }
                })(),
                "id": x.id
            })
        })

        const calls = _.map(ingredientInfo, x => {
            if (x.unit != "") {
                // console.log(x, "has unit")
                let params = ['?']
                params.push(`amount=${x.amount}`)
                params.push(`&unit=${x.unit}`)
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => {
                    // console.log(result.data)
                    return result.data
                })
            } else if (x.unit == "") {
                // console.log(x, "has no unit")
                let params = ['?', `amount=${x.amount}`]
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => {
                    // console.log(result.data)
                    return result.data
                })
            }
        })

        return Promise.all(calls).then(data => {
            let nutrients = []
            _.map(data, x => {
                nutrients.push(x.nutrition.nutrients)
            })
            let mergedNutrients = _.flatten(nutrients)
            for (let i = 0; i < mergedNutrients.length; i++) {
                for (let j = mergedNutrients.length - 1; j > i; j--) {
                    if (mergedNutrients[j].title === mergedNutrients[i].title) {
                        mergedNutrients[i].amount += mergedNutrients[j].amount || mergedNutrients[i].amount;
                        mergedNutrients.splice(j, 1)
                    }
                }
            }
            let middleData = [mergedNutrients, servings]
            return middleData
        }).then(result => {
            let data = result[0]
            let finalData = [{}, result[1]];
            data.forEach(x => {
                finalData[0][x.title] = x
            })
            return finalData
        })
    }


    this.getRecipeInfo = (id) => {
        let recipeId = { id }
        return $http.put(`/search/getRecipeInfo/`, recipeId)
            .then(response => {
                let steps = response.data.analyzedInstructions[0].steps
                let fixedSteps = []

                _.map(steps, x => {
                    if (x.step.length > 1) {
                        fixedSteps.push(x)
                    }
                })
                for (var i = 0; i < fixedSteps.length; i++) {
                    fixedSteps[i].number = i + 1
                }
                let responseData = [response, fixedSteps]
                return responseData
            })
    }
})