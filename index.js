const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const axios = require('axios');
const _ = require('underscore-node')

const { secret, dbUser, database } = require('./serverStack/config.js')
const connectionString = `postgres://${dbUser}@localhost/${database}`;

massive(connectionString).then(db => {
    app.set('db', db)
})


const port = 3000;

const app = express();

app.use(json());
app.use(cors());
app.use(express.static('./public'));

const userCtrl = require('./serverStack/controllers/userCtrl')
app.get('/users/getRecipeBooks/:id', userCtrl.getRecipeBooks)
app.get('/users/getRecipesFromBooks/:id', userCtrl.getRecipesFromBooks)
app.post('/users/createRecipeBook', userCtrl.createRecipeBook)
app.post('/users/deleteRecipeFromBook', userCtrl.deleteRecipeFromBook)
app.post('/users/saveRecipeNutrition', userCtrl.saveRecipeNutrition)
app.post('/users/getRecipeNutrition', userCtrl.getRecipeNutrition)

app.post('/users/createUser', userCtrl.createUser)
app.post('/users/saveRecipe', userCtrl.saveRecipe)

app.get('/users/GetGroceryLists/:id', userCtrl.getGroceryLists)
app.post('/users/saveItemsToGroceryList', userCtrl.saveItemsToGroceryList)
app.post('/users/createGroceryList', userCtrl.createGroceryList)
app.post('/users/getItemsInGroceryList', userCtrl.getItemsInGroceryList)
app.post('/users/deleteGroceryList', userCtrl.deleteGroceryList)
app.post('/users/updateGroceryList', userCtrl.updateGroceryList)

//should probably refactor this into it's own file

app.get('/users/getMealPlanData/:id', userCtrl.getMealPrepData)
app.post('/users/createMealPlan', userCtrl.createMealPlan)
app.post('/users/getMealPlans', userCtrl.getMealPlans)
app.post('/users/deleteMealPlan', userCtrl.deleteMealPlan)
app.post('/users/insertMealPlanData', userCtrl.insertMealPlanData)
app.post('/users/updateMealPlanData', userCtrl.updateMealPlanData)

app.post(`/users/deleteBook`, userCtrl.deleteBook)

const retrieveCtrl = require('./serverStack/controllers/retrieveCtrl')

app.get('/search/mealplan', retrieveCtrl.generateMealPlan)

app.put('/search/recipeBasic', retrieveCtrl.searchRecipeBasic)
app.put('/search/getRecipeInfo', retrieveCtrl.getRecipeInfo)
app.put('/search/getRecipeNutrition', retrieveCtrl.getRecipeNutrition)




// app.get('/search/saveRecipeData', retrieveCtrl.saveRecipeData)

app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})