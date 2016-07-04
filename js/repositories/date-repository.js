"use strict";

finkipm.core.registerRepository('dateRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    // remove me
    //apiUrl = './';

    return {
        getAllYearsWithMonths: getAllYearsWithMonths,

        mapSend: mapSend,
        mapReceive: mapReceive
    };



    /// implementation /////////

    function getAllYearsWithMonths() {

       //var url = apiUrl + 'dummy-data/allYearsWithMonths.json';
        var url = apiUrl + 'v1/measurements/allYearsWithMonths';

       var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
           type: 'GET',
           url: url,
           dataType: 'json'
       });

       _promiseCache[url] = promise;

       return promise.then(function (data) {

           return process(data);
       });

    }



    /// mappers /////////

    function mapSend(data) {
        // mappings here - from app to api
        return data;
    }

    function mapReceive(data) {
        // mappings here - from api to app (use model properties)
        return data;
    }


    /// processors /////////

    function process(response) {
        var dateObjectArray = objectifyDateStrings(response.data);
        var packagedDates = packageMonthsInYearsObject(dateObjectArray);
        return prettifyDateResponseFormat(packagedDates);
    }

    // input:   ['2013-01', '2013-02', '2013-03']
    // output:  [{year: '2013', month: '01'}, {year: '2013', month: '02'}, {year: '2013', month: '03'}]
    function objectifyDateStrings(dateStrings){

        return _utils.linq.select(dateStrings, function (yearMonthString) {
            var yearMonthArray = yearMonthString.split("-");
            return {
                year: yearMonthArray[0],
                month: yearMonthArray[1]
            }
        });
    }

    // input:   [{year: '2013', month: '01'}, {year: '2013', month: '02'}, {year: '2013', month: '03'}]
    // output:  { 2013 : ['01', '02', '03']}
    function packageMonthsInYearsObject(dates) {

        var i,
            years = {};

        for(i=0; i<dates.length; i++){
            if(!years.hasOwnProperty(dates[i].year)){
                years[dates[i].year] = [];
            }
            years[dates[i].year].push(dates[i].month);
        }

        return years;
    }

    // input:   { 2013 : ['01', '02', '03']}
    // output:  [{year: 2013, months: ['Јануари', 'Февруари', 'Март']}]
    function prettifyDateResponseFormat(dates) {

        var result = [];

        for(var key in dates) {
            if(dates.hasOwnProperty(key)) {
                result.push({year: key, months: prettifyMonthsArray(dates[key])});
            }
        }

        return result;
    }

    // input:   ['01', '02', '03']
    // output:  ['Јануари', 'Февруари', 'Март']
    function prettifyMonthsArray(monthsArray) {

        return _utils.linq.select(monthsArray, function (monthNumberString) {
            return mapMonthNumberToName(parseInt(monthNumberString));
        })
    }

    function mapMonthNumberToName(monthNumber) {

        switch (monthNumber){
            case 1 : return 'Јануари';
            case 2 : return 'Февруари';
            case 3 : return 'Март';
            case 4 : return 'Април';
            case 5 : return 'Мај';
            case 6 : return 'Јуни';
            case 7 : return 'Јули';
            case 8 : return 'Август';
            case 9 : return 'Септември';
            case 10 : return 'Октомври';
            case 11 : return 'Ноември';
            case 12 : return 'Декември';
        }
    }


})());


