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
        let ingredientInfo = []

        _.mapObject(data, x => {

            ingredientInfo.push({ "amount": x.amount, "unit": x.unit, "id": x.id })
        })
        let ingredientData = []


        const calls = _.map(ingredientInfo, x => {
            if (x.unit === "") {
                console.log(x.unit)
                let params = ['?', `amount=${x.amount}`]
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => { return result.data })
            } else if (x.unit !== "") {
                console.log(x.unit)
                let params = ['?']
                params.push(`amount=${x.amount}`)
                params.push(`&unit=${x.unit}`)
                return $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": params.join('') }).then(result => { return result.data })
            }
        })

        Promise.all(calls).then(data => {
            console.log(data)
            let nutrients = []
            _.map(data, x => {
                nutrients.push(x.nutrition.nutrients)
            })
            console.log(nutrients)

            let mergedNutrients = _.flatten(nutrients)
            console.log(mergedNutrients)

            for (let i = 0; i < mergedNutrients.length; i++) {
                for (let j = mergedNutrients.length - 1; j > i; j--) {
                    if (mergedNutrients[j].title === mergedNutrients[i].title) {
                        mergedNutrients[i].amount += mergedNutrients[j].amount || mergedNutrients[i].amount;
                        mergedNutrients.splice(j, 1)
                    }
                }
            }
            console.log(mergedNutrients)





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