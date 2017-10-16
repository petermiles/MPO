angular.module('MPOApp').service('mealPrepServ', function($http, $stateParams, $compile) {
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
                return result
            }
        )

    }

    this.getMealPrepData = (id) => {
        var pageId = $stateParams.id
        return $http.get(`/users/getMealPlanData/${id}`).then(result => {
            if (result.data.length) {
                return JSON.parse(result.data[0].recipes)
            } else if (!result.data.length) {
                return result
            }
        })
    }

    this.createCalendar = () => {
        var d = new Date();
        var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month = d.getMonth(); //0-11
        var year = d.getFullYear(); //2014
        var first_date = month_name[month] + " " + 1 + " " + year;
        //September 1 2014
        var tmp = new Date(first_date).toDateString();
        //Mon Sep 01 2014 ...
        var first_day = tmp.substring(0, 3); //Mon
        var day_name = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var day_no = day_name.indexOf(first_day); //1
        var days = new Date(year, month + 1, 0).getDate(); //30
        //Tue Sep 30 2014 ...
        var calendar = this.get_calendar(day_no, days);
        document.getElementById("calendar-month-year").innerHTML = month_name[month] + " " + year;
        document.getElementById("calendar-dates").appendChild(calendar);
    }

    this.get_calendar = function(day_no, days) {
        var table = document.createElement('table')
        table.className = "table";
        var tr = document.createElement('tr');

        //row for the day letters
        for (var c = 0; c <= 7; c++) {
            var td = document.createElement('td');
            td.innerHTML = ["&nbsp;", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][c];
            tr.appendChild(td);
        }
        table.appendChild(tr);

        //creates morning row
        tr = document.createElement('tr');
        var c;
        for (c = 0; c <= 7; c++) {
            if (c == day_no) {
                break;
            }
            var td = document.createElement('td');
            td.innerHTML = "nope";
            tr.appendChild(td);
        }
        for (var c = 1; c <= 8; c++) {
            if (c === 1) {
                var td = document.createElement('td');
                td.innerHTML = "Morning";
                tr.appendChild(td);
            } else if (c !== 1) {
                var td = document.createElement('td');
                let div = document.createElement('div');
                div.className = "app";
                div.setAttribute("ng-repeat", `m${c} in calendarData.morning${c} track by $index`);
                td.appendChild(div);
                let img = document.createElement('img')
                img.setAttribute("ng-src", `{{m${c}.profile_pic_thumbnail`)
                div.appendChild(img)
                let text = document.createElement('p')
                text.innerHTML = `{{m${c}.name}}`
                div.appendChild(text)
                td.className = "apps-container";
                td.setAttribute("ui-sortable", "sortableOptions");
                td.setAttribute("ng-model", `calendarData.morning${c}`)
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);

        //create noon row
        tr = document.createElement('tr');
        var c;
        for (c = 0; c <= 7; c++) {
            if (c == day_no) {
                break;
            }
            var td = document.createElement('td');
            td.innerHTML = "nope";
            tr.appendChild(td);
        }
        for (var c = 1; c <= 8; c++) {
            if (c === 1) {
                var td = document.createElement('td');
                td.innerHTML = "Noon";
                tr.appendChild(td);
            } else if (c !== 1) {
                var td = document.createElement('td');
                let div = document.createElement('div');
                div.className = "app";
                div.setAttribute("ng-repeat", `n${c} in calendarData.noon${c} track by $index`);
                td.appendChild(div);
                let img = document.createElement('img')
                img.setAttribute("ng-src", `{{n${c}.profile_pic_thumbnail`)
                div.appendChild(img)
                let text = document.createElement('p')
                text.innerHTML = `{{n${c}.name}}`
                div.appendChild(text)
                td.className = "apps-container";
                td.setAttribute("ui-sortable", "sortableOptions");
                td.setAttribute("ng-model", `calendarData.noon${c}`)
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);

        //create evening row
        tr = document.createElement('tr');
        var c;
        for (c = 0; c <= 7; c++) {
            if (c == day_no) {
                break;
            }
            var td = document.createElement('td');
            td.innerHTML = "nope";
            tr.appendChild(td);
        }
        for (var c = 1; c <= 8; c++) {
            if (c === 1) {
                var td = document.createElement('td');
                td.innerHTML = "Evening";
                tr.appendChild(td);
            } else if (c !== 1) {
                var td = document.createElement('td');
                let div = document.createElement('div');
                div.className = "app";
                div.setAttribute("ng-repeat", `e${c} in calendarData.evening${c} track by $index`);
                td.appendChild(div);
                let img = document.createElement('img')
                img.setAttribute("ng-src", `{{e${c}.profile_pic_thumbnail`)
                div.appendChild(img)
                let text = document.createElement('p')
                text.innerHTML = `{{e${c}.name}}`
                div.appendChild(text)
                td.className = "apps-container";
                td.setAttribute("ui-sortable", "sortableOptions");
                td.setAttribute("ng-model", `calendarData.morning${c}`)
                tr.appendChild(td);
            }
        }
        table.appendChild(tr);
        return table
    }
})