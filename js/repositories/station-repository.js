/**
 * Created by srbo on 01-Jul-16.
 */



finkipm.core.registerRepository('stationRepository',(function () {

    "use strict";

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};
    var _stationCache = {};


    return {
        getAll: getAll,
        get : get,
        create: create,
        update: update,
        remove: remove,

        mapSend: mapSend,
        mapReceive: mapReceive
    };


    /// CRUD implementation /////////

     function getAll() {

        var url = apiUrl + 'v1/stations';

        var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
            type : 'GET',
            url : url,
            dataType : 'json'
        });

        //_promiseCache[url] = _utils.object(promise);
        _promiseCache[url] = promise;

        return promise.then(function (response) {
            // process, map and return data
            var stations = response.data.stations;

            return _utils.linq.select(stations, function (station) {
                return mapReceive(station);
            });
        });
     }

     function get(id) {

        var url = apiUrl + 'v1/stations/' + id;

        var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
            type : 'GET',
            url : url,
            dataType : 'json'
        });

        _promiseCache[url] = _utils.object(promise);

        return promise.then(function (response) {
            // process, map and return data

            return mapReceive(response.data);
        });
     }

     function create(station) {

     }

     function update(station) {

     }

     function remove(id) {

     }



    /// mappers /////////

    function mapSend(station) {
        // mappings here - from app to api
        return {

        };
    }

    function mapReceive(station) {
        // mappings here - from api to app (use model properties)
        return {
            id : station.id,
            cityId: station.cityId,
            description : station.description,
            lat: parseFloat(station.lat),
            lng: parseFloat(station.lng)
        };
    }


})());


