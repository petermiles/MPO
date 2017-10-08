angular.module('MPOApp').service('mealPrepServ', function($http) {

	firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })

	this.createMealPlan = (name, notes) => {
		let mealPrepInfo = [name, notes, this.user.uid]
		console.log(mealPrepInfo)
		return $http.post('/users/createMealPlan', mealPrepInfo)
		.then(result => {
			return result
		})
	}

	this.deleteMealPlan = (id) => {
		let mealPrepInfo = [id, this.user.uid]
		return $http.post('/users/deleteMealPlan', mealPrepInfo)
		.then(result => {
			return result
		})
	}
	//figure out constant and then use resolve
	this.getMealPlans = (id) => {
		let userId = [this.user.uid]
		return $http.post('/users/getMealPlans', userId)
		.then(result => {
			return result
		})
	}
})