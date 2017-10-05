angular.module("MPOApp").service("dataServ", function($http) {
	
	this.generateMealPlan = (calories,time) => {

		return $http.get(`/search/mealplan/?targetCalories=${calories}&timeFrame=${time}`).then(response => {
			time = time.toLowerCase();
			if(time === "week") {
				return response.data.items
			} else if (time === "day"){
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
		return $http.put(`/search/recipeBasic/`, {searchQueries})
		.then(response => {
			return response
		})
		.catch((err) => {
			console.log(err)
		})
	}


	
	
	this.getRecipeInfo = (id, stepBreakdown) => {
		let recipeId = {id}
		return $http.put(`/search/getRecipeInfo/` , recipeId)
		.then(response => {
			return response
		})
	}
})











