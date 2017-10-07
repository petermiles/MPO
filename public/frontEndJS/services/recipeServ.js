angular.module('MPOApp').service("recipeServ", function($http) {

	

    this.getRecipeInfo = (id, stepBreakdown) => {
        let recipeId = { id }
        return $http.put(`/search/getRecipeInfo/`, recipeId)
            .then(response => {
                return response
            })
    }

})