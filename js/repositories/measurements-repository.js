"use strict";

finkipm.core.registerRepository('measurementsRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    var count = 0;

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

    function constructUrlForFilter(filter) {

        var url = apiUrl + 'dummy-data/';

        if(filter.mapType === enums.mapType.SREDNA_VREDNOST.value) {
            url += 'sk-avg.json';
            //url += 'emptyArray.json';
        } else {
            url += 'sk-po-stanica.json';
        }

        return url;
    }


    function constructUrlForFilter2(filter) {

        var url = apiUrl + 'dummy-data/';

        if(filter.mapType === enums.mapType.SREDNA_VREDNOST.value) {
            if(count % 2 === 0) url += 'sk-avg.json';
            else url += 'emptyArray.json';
            count++;
        } else {
            url += 'sk-po-stanica.json';
        }

        return url;
    }

    return {

        getFiltered : function (filter) {

            var url = constructUrlForFilter2(filter);
            // var postPayload = constructPayloadForFilter(filter);

            var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
                type : 'GET',
                url : url,
                dataType : 'json'
            });

            //_promiseCache[url] = _utils.object(promise);
            _promiseCache[url] = promise;

            return promise.then(function (data) {

                // process, map and return data
                return data;
            });
        }

        /*getAll : function () {

            var url = apiUrl + 'dummy-data/cities.json';

            var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
                type : 'GET',
                url : url,
                dataType : 'json'
            });

            _promiseCache[url] = promise;

            return promise.then(function (data) {

                // process, map and return data
                return data;
            });
        },

        get : function (id) {

            var url = apiUrl + 'dummy-data/cities-id.json';

            var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
                type : 'GET',
                url : url,
                dataType : 'json'
            });

            _promiseCache[url] = promise;

            return promise.then(function (data) {

                // process, map and return data
                return data;
            });
        },

        create : function (city) {

        },

        update : function (city) {

        },

        delete : function (id) {

        }*/
    };
})());


