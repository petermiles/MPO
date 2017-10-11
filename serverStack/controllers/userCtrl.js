const createUser = (req, res) => {
    req.app
        .get('db')
        .create_user(req.body)
}

const createRecipeBook = (req, res) => {
    req.app
        .get('db')
        .create_book(req.body)
        .then(result => res.json(result))
}

const getRecipeBooks = (req, res) => {
    req.app
        .get('db')
        .get_books(req.params.id)
        .then((result) => res.json(result))
}

const deleteBook = (req, res) => {
    req.app
        .get('db')
        .delete_book(req.body)
        .then((result) => { res.json(result) })
}

const saveRecipe = (req, res) => {
    req.app
        .get('db')
        .save_recipe(req.body)
        .then(result => {
            return result
        })
}

const getRecipesFromBooks = (req, res) => {
    req.app
        .get('db')
        .get_recipes_from_books(req.params.id)
        .then(result => {
            return res.json(result)
        })
}

const deleteRecipeFromBook = (req,res) => {
    console.log(req.body)
    req.app
    .get('db')
    .delete_recipe_from_book(req.body)
    .then(result => {
        return res.json(result)
    })
}

const createMealPlan = (req,res) => {
    req.app
    .get('db')
    .create_meal_plan(req.body)
    .then(result => {
        return res.json(result)
    })
}

const getMealPlans = (req,res) => {
    console.log(req.body)
    req.app
    .get('db')
    .get_meal_plans(req.body)
    .then(result => {
        return res.json(result)
    })
}

const deleteMealPlan = (req,res) => {
    req.app
    .get('db')
    .delete_meal_plan(req.body)
    .then(result => {
        return res.json(result)
    })
}

const insertMealPlanData = (req,res) => {
    req.app
    .get('db').
    insert_meal_plan_data(req.body)
    .then(result => {
        return res.json(result)
    })
}

const getMealPrepData = (req,res) => {
    console.log(req.params)
    req.app
    .get('db')
    .get_meal_prep_data(req.params.id)
    .then(result => {
        return res.json(result)
    })
}

module.exports = {
    createUser,
    createRecipeBook,
    getRecipeBooks,
    deleteBook,
    saveRecipe,
    getRecipesFromBooks,
    deleteRecipeFromBook,
    createMealPlan,
    getMealPlans,
    deleteMealPlan,
    insertMealPlanData,
    getMealPrepData
}