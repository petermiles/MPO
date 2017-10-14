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
                console.log(JSON.parse(result.data[0].items))
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
        let listData = $http.post(`/users/getItemsInGroceryList`, [id]).then(result => {
            // console.log(JSON.parse(result.data[0].items))
            //             console.log(data)
            let existingData = JSON.parse(result.data[0].items)
            let newData = data
            let arr = []

            // console.log(data);

            // console.log(newData, existingData)

            existingData.push(data);
            let merged = _.flatten(existingData);

            // console.log('Totes: ', totes);

            for (let i = 0; i < merged.length; i++) {
                for (let j = merged.length - 1; j > i; j--) {
                    if (merged[j].name === merged[i].name) {
                        merged[i].amount += merged[j].amount || merged[i].amount;
                        merged.splice(j, 1)
                    }
                }
            }
            console.log(merged);



            // var included = existingData.reduce((acc, data, i) => existingData.name === data.name ? acc = i : acc, false)
            // console.log(included)

            // if (included) {
            //     existingData[included].amount += data.amount
            // } else {
            //     arr.push(data)
            // }
            // console.log(existingData)


            // let listDataFinal = []
            // existingData.forEach(x => {
            //     let test = newData.find(y => { return y.name == x.name })
            //     if (test) {
            //         existingData.amount += x.amount
            //     } else {
            //         listDataFinal.push(x)
            //     }
            // })




            //     if (JSON.parse(result.data[0].items)) {
            //         console.log('nope')
            //         let listDataOriginal = JSON.parse(result.data[0].items)
            //         listDataOriginal.forEach(x => {
            //             existingData = listDataMiddle.find(y => { return y.name == x.name })
            //             if (existingData) {
            //                 existingData.amount += x.amount
            //             } else {
            //                 listDataOriginal.push(x)
            //             }
            //         })
            //         // console.log(listDataOriginal)

            // }
        })
    }
    //             })
    //             let listDataFinal = [id, listDataMiddle]
    //             console.log(listDataFinal)
    //             $http.post('/users/saveItemsToGroceryList', listDataFinal).then(result => {
    //                 let data = result

    //             })
    //         }
    //         else {
    //             let listDataFinal = [id, JSON.stringify(data)]
    //             return $http.post('/users/saveItemsToGroceryList', listDataFinal).then(result => {
    //         //         let data = result
    //         //         return data
    //         //     })
    //         // }
    //         return result
    //     }
    //     // let listDataOriginal = JSON.parse(result.data[0].items)
    //     // let listDataMiddle = []
    //     // listDataOriginal.forEach(x => {
    //     //     existingData = listDataMiddle.find(y => { return y.name == x.name })
    //     //     if (existingData) {
    //     //         existingData.amount += x.amount
    //     //     } else {
    //     //         listDataMiddle.push(x)
    //     //     }
    //     // })
    //     // let listDataFinal = [id, JSON.stringify(listDataMiddle)]
    //     // console.log(listDataFinal)
    //     // return $http.post('/users/saveItemsToGroceryList', listDataFinal)
    //     // return listDataFinal
    // })
    // // .then(() => {
    // //     console.log(listDataFinal)
    // //     $http.post('/users/saveItemsToGroceryList', listDataFinal

})