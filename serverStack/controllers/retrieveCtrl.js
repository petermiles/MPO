const axios = require('axios')
axios.defaults.headers.common['X-Mashape-Key'] = "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP";

const generateMealPlan = (req, res) => {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.query.targetCalories}&timeFrame=${req.query.timeFrame}`)
        .then((result) => {
            res.json(result.data)
        })
}

const searchRecipeBasic = (req, res) => {

    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search/${req.body.searchQueries}`)
        .then((result) => {
            res.json(result.data.results)
        })
}

const getRecipeInfo = (req, res) => {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${req.body.id}/information`)
        .then((result) => {
            res.json(result.data)
        })
}


const getRecipeNutrition = (req, res) => {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/${req.body.id}/information${req.body.searchQueries}`).then(result => {
    	console.log(result)
        return res.json(result.data)
    })
}
module.exports = {
    generateMealPlan,
    searchRecipeBasic,
    getRecipeInfo,
    getRecipeNutrition
}