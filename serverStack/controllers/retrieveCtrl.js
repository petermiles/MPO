const axios = require('axios')


const generateMealPlan = (req,res,next) => {
	console.log(req.query)
	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=2000&timeFrame=day`, 
	{
	  headers : {"X-Mashape-Key" : "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP" }
	})
	.then((result) => {
  		res.json(result.data.meals)
  	})
}


module.exports = {
	generateMealPlan
}

