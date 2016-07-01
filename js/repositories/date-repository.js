"use strict";

finkipm.core.registerRepository('dateRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    // remove me
    apiUrl = './';

    return {
        getAllYearsWithMonths: getAllYearsWithMonths,

        mapSend: mapSend,
        mapReceive: mapReceive
    };



    /// implementation /////////

    function getAllYearsWithMonths() {

       var url = apiUrl + 'dummy-data/allYearsWithMonths.json';

       var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
           type: 'GET',
           url: url,
           dataType: 'json'
       });

       //_promiseCache[url] = _utils.object(promise);
       _promiseCache[url] = promise;

       return promise.then(function (data) {

           return data;
       });

       /*return $.ajax({
        type : 'GET',
        url : serverUrl + 'v1/allYearsWithMonths',
        contentType : 'aapplication/json',
        dataType : 'json',
        data : {}
        });*/
    }



    /// mappers /////////

    function mapSend(date) {
        return {
            // mappings here - from app to api
        };
    }

    function mapReceive(date) {
        return {
            // mappings here - from api to app (use model properties)
        };
    }

})());


