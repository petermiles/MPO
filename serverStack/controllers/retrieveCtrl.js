const axios = require('axios')
axios.defaults.headers.common['X-Mashape-Key'] = "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP";

const generateMealPlan = (req, res) => {
    axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${req.query.targetCalories}&timeFrame=${req.query.timeFrame}`)
        .then((result) => {
            res.json(result.data)
        })
}

const getTrivia = (req, res) => {
    return axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/trivia/random')
        .then(result => {
            console.log("endpoint ctrl",result.data)
        return result.data
    })
}

const getRandomRecipes = (req, res) => {
    axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=12')
        .then(result => {
            return res.json(result.data.recipes)
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
        return res.json(result.data)
    })
}

const parseGroceryListSearch = (req, res) => {
    axios.post(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/parseIngredients?includeNutrition=false`)
}


module.exports = {
    generateMealPlan,
    getTrivia,
    searchRecipeBasic,
    getRecipeInfo,
    getRecipeNutrition,
    getRandomRecipes,
    parseGroceryListSearch
}