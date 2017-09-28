angular.module("MPOApp").service("dataServ", function($http) {
	
	this.generateMealPlan = (calories,time) => {
		return $http.get(`/search/mealplan/?targetCalories=${calories}&timeFrame=${time}`)
	}
})