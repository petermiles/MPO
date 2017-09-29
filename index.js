const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const cors = require('cors')
const axios = require('axios')
const unirest = require('unirest')

const port = 3000


const app = express();

app.use(json());
app.use(cors());


app.use(express.static('./public'));


const retrieveCtrl = require('./serverStack/controllers/retrieveCtrl')

app.get('/search/mealplan', retrieveCtrl.generateMealPlan)
app.put('/search/recipeBasic', retrieveCtrl.searchRecipeBasic)


app.listen(port, () => {
	console.log(`Listening on ${port}.`)
})


