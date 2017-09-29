

const axios = require('axios')
axios.defaults.headers.common['X-Mashape-Key'] = "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP";

const generateMealPlan = (req,res,next) => {
	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.query.targetCalories}&timeFrame=${req.query.timeFrame}`)
	.then((result) => {
		res.json(result.data)
  	})
}

const searchRecipeBasic = (req,res,next) => {
	console.log(req.body)

	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search/${req.body.searchQueries}`)
	.then((result) => {
		console.log(result.data)
  	})
}

module.exports = {
	generateMealPlan,
	searchRecipeBasic
}


// https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?diet=vegetarian&instructionsRequired=true&intolerances=gluten%2C+wheat&limitLicense=false&number=5&offset=0&query=salad&type=main+course


