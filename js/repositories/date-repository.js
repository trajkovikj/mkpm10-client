"use strict";

finkipm.core.registerRepository('dateRepository',(function () {

    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    function mapSend(city) {
        return {
            // mappings here - from app to api
        };
    }

    function mapReceive(city) {
        return {
            // mappings here - from api to app (use model properties)
        };
    }

    return {

        getAllYearsWithMonths : function () {

            var url = apiUrl + 'dummy-data/allYearsWithMonths.json';

            var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json'
            });

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


    };

})());


