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

    this.searchRecipeBasic = (humanQuery, diet, badIng, reqInstr, intol, recType, limit) => {
        let params = ['?'];

        if (diet) {
            params.push(`&diet=${diet}`)
        }
        if (badIng) {
            params.push(`&excludeIngredients=${badIng}`)
        }
        if (reqInstr) {
            params.push(`&instructionsRequired=${reqInstr}`)
        }
        if (intol) {
            params.push(`&intolerances=${intol}`)
        }
        if (humanQuery) {
            params.push(`query=${humanQuery}`)
        }
        if (limit) {
            params.push(`&number=${limit}`)
        }
        if (recType) {
            params.push(`&type=${recType}`)
        }
        let searchQueries = params.join('')

        console.log(searchQueries)
        return $http.put(`/search/recipeBasic/`, { searchQueries })
            .then(response => {
                return response
            })
    }

    this.persistResults;

    this.parseIngredients = (data) => {
        let servings = data[1]
        let ingredientInfo = []
        console.log(servings)

        _.mapObject(data[0], x => {
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
            if (x.unit === "") {
                let params = ['?', `amount=${x.amount}`]
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => {
                    return result.data
                })
            } else if (x.unit !== "") {
                let params = ['?']
                params.push(`amount=${x.amount}`)
                params.push(`&unit=${x.unit}`)
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => {
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
                return response
            })
    }
})