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
            // $http.put('/search/getRecipeNutrition', ingredientInfo)
        })
        _.map(ingredientInfo, x => {
            // console.log(x)
            if (x.unit === "") {
                let params = ['?']

                params.push(`amount=${x.amount}`)

                let searchQuery = params.join('')
                // console.log(searchQuery)
                $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": searchQuery }).then(result => {
                    console.log(result)
                    return result
                })
            } else if (x.unit !== "") {
                let params = ['?']
                params.push(`amount=${x.amount}`)
                params.push(`&unit=${x.unit}`)
                let searchQuery = params.join('')
                $http.put('/search/getRecipeNutrition', { "id": x.id, "searchQueries": searchQuery }).then(result => {
                    // console.log(result)
                    return result.data
                })
            }
        })
        //     let params = ['?']
        //     // https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/9266/information?amount=1&unit=cup
        // if (x.amount) {
        //     params.push(`amount=${x.amount}`)
        // }
        // if (x.unit) {
        //     params.push(`&unit=${x.unit}`)
        // }
        // let searchQuery = params.join('')
        // console.log(params)

        // console.log(unitData)
        // for (var i = 0; i < params.length; i++) {
        //     $http.put('/search/getRecipeNutrition', { "id": params.id, "searchQueries": searchQuery })
        // }
        // console.log(params)
    }




    this.getRecipeInfo = (id) => {
        let recipeId = { id }
        return $http.put(`/search/getRecipeInfo/`, recipeId)
            .then(response => {
                return response
            })
    }
})