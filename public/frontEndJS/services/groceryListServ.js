angular.module('MPOApp').service('groceryListServ', function($stateParams, $http) {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            this.user = user
            return user
        };
    })

    this.saveItemsToGroceryList = (id, data) => {
        console.log(id, data)
        let items = [id, JSON.stringify(data)]
        console.log(items)
        // console.log(data)
        return $http.post('/users/saveItemsToGroceryList', items)
    }

    this.createGroceryList = (name) => {
        var id = [name, this.user.uid]
        return $http.post('/users/createGroceryList', id)
            .then(result => { return result })
    }

    this.getGroceryLists = () => {
        let id = this.user.uid;
        return $http.get(`/users/getGroceryLists/${id}`)
            .then((result) => { return result })
    }

    this.getItemsInList = (id) => {
        console.log(id)
        return $http.post('/users/getItemsInGroceryList', [id])
            .then(result => {
                // console.log(JSON.parse(result.data[0].items))
                return result
            })
    }

    this.deleteGroceryList = (id) => {
        let deleteParams = [id, this.user.uid]
        return $http.post(`/users/deleteGroceryList`, deleteParams)
            .then(result => {
                return result
            })
    }

    this.groceryListDataManipulation = (id, data) => {

        return $http.post(`/users/getItemsInGroceryList`, [id]).then(result => {
            console.log(result)
            if (!result.data.length) {
                $http.post('/users/saveItemsToGroceryList', [id, JSON.stringify(data)])
            } else if (result.data.length) {
                let existingData = JSON.parse(result.data[0].items)
                let newData = data

                existingData.push(data);
                let merged = _.flatten(existingData);


                for (let i = 0; i < merged.length; i++) {
                    for (let j = merged.length - 1; j > i; j--) {
                        if (merged[j].name === merged[i].name) {
                            merged[i].amount += merged[j].amount || merged[i].amount;
                            merged.splice(j, 1)
                        }
                    }
                }
                let newList = [id, JSON.stringify(merged)]
                $http.post('/users/updateGroceryList', newList)
            }
        })
    }
})