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

    this.sortableOptions = {
        connectWith: ".apps-container",
        start: function(e, ui) {
            $scope.sourceModelClone = ui.item.sortable.sourceModel.slice();
        },
        stop: function(e, ui) {
            if (
                $(e.target).hasClass("source") &&
                ui.item.sortable.droptarget &&
                e.target != ui.item.sortable.droptarget[0]
            ) {
                ui.item.sortable.sourceModel.length = 0;
                Array.prototype.push.apply(
                    ui.item.sortable.sourceModel,
                    $scope.sourceModelClone
                );
                $scope.sourceModelClone = null;
            }
        }
    };

})