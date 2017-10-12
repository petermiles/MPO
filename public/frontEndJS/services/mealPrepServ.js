angular.module('MPOApp').service('mealPrepServ', function($http, $stateParams) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })

    this.createMealPlan = (name, notes) => {
        let mealPrepInfo = [name, notes, this.user.uid]
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

    this.saveMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, afternoon1, afternoon2, afternoon3, afternoon4, afternoon5, afternoon6, afternoon7) => {
        let data = [{ morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, afternoon1, afternoon2, afternoon3, afternoon4, afternoon5, afternoon6, afternoon7 }, $stateParams.id]
        let mealPrepData = [JSON.stringify(data), $stateParams.id]
        return $http.post('/users/insertMealPlanData', mealPrepData).then(
            result => { return result }
        )
    }

    this.getMealPrepData = () => {
        var pageId = $stateParams.id
        return $http.get(`/users/getMealPlanData/${pageId}`).then(result => {
            let res = (JSON.parse(result.data[0].recipes))
            return res
        })
    }






})