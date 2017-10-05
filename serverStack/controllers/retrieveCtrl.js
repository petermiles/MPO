

const axios = require('axios')
axios.defaults.headers.common['X-Mashape-Key'] = "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP";

const generateMealPlan = (req,res,next) => {
	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.query.targetCalories}&timeFrame=${req.query.timeFrame}`)
	.then((result) => {
		res.json(result.data)
  	})
}

const searchRecipeBasic = (req,res,next) => {

	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search/${req.body.searchQueries}`)
	.then((result) => {
		res.json(result.data.results)
  	})
}

const getRecipeInfo = (req,res,next) => {
	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${req.body.id}/information`)
	.then((result) => {
		res.json(result.data)
	})
}
module.exports = {
	generateMealPlan,
	searchRecipeBasic,
	getRecipeInfo
}
