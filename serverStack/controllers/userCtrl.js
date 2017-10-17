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
            return res.json(result)
        })
}

const saveRecipeNutrition = (req,res) => {
    req.app
    .get('db')
    .save_recipe_nutrition(req.body)
    .then(result => {
        return result
    })
}

const getRecipeNutrition = (req,res) => {
    req.app
    .get('db')
    .get_recipe_nutrition(req.body)
    .then(result => {
        return res.json(result)
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

const deleteRecipeFromBook = (req, res) => {
    req.app
        .get('db')
        .delete_recipe_from_book(req.body)
        .then(result => {
            return res.json(result)
        })
}

const createMealPlan = (req, res) => {
    req.app
        .get('db')
        .create_meal_plan(req.body)
        .then(result => {
            return res.json(result)
        })
}

const getMealPlans = (req, res) => {
    req.app
        .get('db')
        .get_meal_plans(req.body)
        .then(result => {
            return res.json(result)
        })
}

const deleteMealPlan = (req, res) => {
    req.app
        .get('db')
        .delete_meal_plan(req.body)
        .then(result => {
            return res.json(result)
        })
}

const insertMealPlanData = (req, res) => {
    req.app
        .get('db')
        .insert_meal_plan_data(req.body)
        .then(result => {
            return res.json(result)
        })
}

const updateMealPlanData = (req,res) => {
    req.app
    .get('db')
    .update_meal_plan_data(req.body)
    .then(result => {
        return res.json(result)
    })
}

const getMealPrepData = (req, res) => {
    req.app
        .get('db')
        .get_meal_prep_data(req.params.id)
        .then(result => {
            return res.json(result)
        })
}

const createGroceryList = (req, res) => {
    req.app
        .get('db')
        .create_grocery_list(req.body)
        .then(result => {
            return res.json(result)
        })
}

const deleteGroceryList = (req, res) => {
    req.app
        .get('db')
        .delete_grocery_list(req.body)
        .then(result => {
            return res.json(result)
        })
}

const getGroceryLists = (req, res) => {
    req.app
        .get('db')
        .get_grocery_lists(req.params.id)
        .then(result => {
            return res.json(result)
        })
}

const saveItemsToGroceryList = (req, res) => {
    req.app
        .get('db')
        .add_items_to_grocery_list(req.body)
        .then(result => {
            return res.json(result)
        })
}

const updateGroceryList = (req, res) => {
    req.app
        .get('db')
        .update_grocery_list(req.body)
}



const getItemsInGroceryList = (req, res) => {
    req.app
        .get('db')
        .get_items_from_grocery_list(req.body)
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
    saveRecipeNutrition,
    getRecipeNutrition,
    getRecipesFromBooks,
    deleteRecipeFromBook,
    createMealPlan,
    getMealPlans,
    deleteMealPlan,
    insertMealPlanData,
    updateMealPlanData,
    getMealPrepData,
    createGroceryList,
    deleteGroceryList,
    getGroceryLists,
    saveItemsToGroceryList,
    getItemsInGroceryList,
    updateGroceryList
}