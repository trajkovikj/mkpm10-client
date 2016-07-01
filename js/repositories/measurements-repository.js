"use strict";

finkipm.core.registerRepository('measurementsRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    // remove me
    apiUrl = './';

    var count = 0;


    return {
        getFiltered: getFiltered,

        mapSend: mapSend,
        mapReceive: mapReceive
    };



    /// implementation /////////

    function constructUrlForFilter(filter) {

        var url = apiUrl + 'dummy-data/';

        if(filter.mapType === enums.mapType.SREDNA_VREDNOST.value) {
            url += 'sk-avg.json';
        } else {
            url += 'sk-po-stanica.json';
        }

        return url;
    }

    function getFiltered(filter) {

        var url = constructUrlForFilter(filter);
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



    /// mappers /////////

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

})());


