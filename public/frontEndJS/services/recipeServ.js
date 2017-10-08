angular.module('MPOApp').service("recipeServ", function($http) {



    this.getRecipeInfo = (id, stepBreakdown) => {
        let recipeId = { id }
        return $http.put(`/search/getRecipeInfo/`, recipeId)
            .then(response => {
                return response
            })
    }

    // this.recipeData = (info) => {
    // 	for (var i = 0; i < info.data.analyzedInstructions[0].steps.length; i++) {
    // 		if(info.data.analyzedInstructions[0].steps.step[i].length < 3) {
    // 			console.log("less than 3")
    // 		}
    // 	}
        
    // }

})