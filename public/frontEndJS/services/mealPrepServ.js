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

    this.saveMealPlanData = (m1, m2, m3, m4, m5, m6, m7, n1, n2, n3, n4, n5, n6, n7, a1, a2, a3, a4, a5, a6, a7, pageId) => {
        let data = { m1, m2, m3, m4, m5, m6, m7, n1, n2, n3, n4, n5, n6, n7, a1, a2, a3, a4, a5, a6, a7}
        let mealPrepData = [JSON.stringify(data), pageId]
        return $http.post('/users/insertMealPlanData', mealPrepData).then(
            result => {return result}
        )
    }

    this.getMealPrepData = (pageId) => {
        console.log(pageId)
        return $http.get(`/users/getMealPrepData/${pageId}`, pageId).then(result => {
            let res = (JSON.parse(result.data[0].recipes))
            console.log(res_.values)
            // let obj = Object.keys(JSON.parse(result.data[0].recipes))
            // return Object.keys(obj).map(x => {
            //     return[Number(x), obj[x]]
            // })
        })
    }





})