// // This file contains snippets of code that have been shared to me for use on the project.
// // This file will not be pushed to the final version of the website.


// app.get('/api/mealplan', getCtrl.generateMealPlan)


// const generateMealPlan = (req,res,next) => {  // triggered by ng-click=generateMealPlan(calories,timeframe)

// 	axios.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/mealplans/generate?targetCalories=${calories}&timeFrame=${timeframe}` , 
// 	{
// 	  headers : {
// 	  	"X-Mashape-Key" : "fuKqe8sItzmshGU0lbuhspnkxnZNp1W3UIwjsnkBErSzjPJuFP"
// 	  }
// 	})
// 	.then(function (result) {
//   console.log(result);
// })
// }