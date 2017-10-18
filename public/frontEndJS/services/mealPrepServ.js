angular.module('MPOApp').service('mealPrepServ', function($http, $stateParams, $compile) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })

    this.createMealPlan = (name, notes, date) => {
        let mealPrepInfo = [name, notes, this.user.uid, date.toISOString()]
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

    this.getMealPlans = (id) => {
        let userId = [this.user.uid]
        return $http.post('/users/getMealPlans', userId)
            .then(result => {
                return result
            })
    }

    this.createEmptyMealPlan = (name, date, id) => {
        let mealPrepInfo = [name, id, date.toISOString()]
        return $http.post('/users/createEmptyMealPlan', mealPrepInfo)
    }



    this.saveMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7) => {
        let data = [{ morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7 }, $stateParams.id]
        let mealPrepData = [JSON.stringify(data), $stateParams.id]
        return $http.post('/users/insertMealPlanData', mealPrepData).then(
            result => { return result }
        )
    }

    this.updateMealPlanData = (morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7) => {
        let data = [{ morning1, morning2, morning3, morning4, morning5, morning6, morning7, noon1, noon2, noon3, noon4, noon5, noon6, noon7, evening1, evening2, evening3, evening4, evening5, evening6, evening7 }, $stateParams.id]
        let mealPrepData = [JSON.stringify(data), $stateParams.id]
        return $http.post('/users/updateMealPlanData', mealPrepData).then(
            result => {
                return JSON.parse(result.data[0].recipes)[0]
            }
        )

    }

    this.getMealPrepData = (id) => {
        var pageId = $stateParams.id
        return $http.get(`/users/getMealPlanData/${id}`).then(result => {
            let dates = [];
            // let dateSubstring = 
            console.log(result.data[0].start_date)
            var date = moment(result.data[0].start_date);
            let begin = moment(date).isoWeekday(0);

            begin.endOf("week");

            for (var i = 0; i < 7; i++) {
                const result = begin.add(1, "d").format("ddd MMM Do ");
                dates.push(result);

                console.log(result)
            }


            let dateHeader = []
            let dateHeaderBegin = begin.add(-6, "d").format("MMMM D YYYY");
            dateHeader.push(dateHeaderBegin)

            let dateHeaderEnd = begin.add(6, "d").format("MMMM D YYYY");
            dateHeader.push(dateHeaderEnd)

            if (result.data.length) {
                let data = [JSON.parse(result.data[0].recipes), dates, dateHeader[0], dateHeader[1]]
                return data
            } else if (!result.data.length) {
                let data = [JSON.parse(result.data[0].recipes), dates, dateHeader[0], dateHeader[1]]
                return data
            }
        })
    }
})