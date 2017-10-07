const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');
const cors = require('cors');
const axios = require('axios');

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
app.post('/users/createUser', userCtrl.createUser)
app.post('/users/createRecipeBook', userCtrl.createRecipeBook)
app.get('/users/getRecipeBooks/:id', userCtrl.getRecipeBooks)

const retrieveCtrl = require('./serverStack/controllers/retrieveCtrl')

app.get('/search/mealplan', retrieveCtrl.generateMealPlan)
app.put('/search/recipeBasic', retrieveCtrl.searchRecipeBasic)
app.put('/search/getRecipeInfo', retrieveCtrl.getRecipeInfo)




// app.get('/search/saveRecipeData', retrieveCtrl.saveRecipeData)

app.listen(port, () => {
    console.log(`Listening on ${port}.`)
})


// const admin = require("firebase-admin");

// var serviceAccount = require("./firebaseAdmin.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://mpoapp.firebaseio.com"
// });