"use strict";

finkipm.core.registerRepository('cityRepository',(function () {

    var _utils = finkipm.utils;
    var _cache = finkipm.core.extensions.cache;
    var apiUrl = finkipm.core.config.apiUrl;
    var stationRepository = finkipm.core.getRepository('stationRepository');
    var _promiseCache = {};

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

        //var url = apiUrl + 'dummy-data/cities.json';
        var url = apiUrl + 'v1/cities';

        var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
            type : 'GET',
            url : url,
            dataType : 'json'
        });

        _promiseCache[url] = promise;

        return promise.then(function (response) {
            // process, map and return data

            var mappedCities = _utils.linq.select(response.data.cities, function (city) {
                 return mapReceive(city);
            });

            _cache.put('cities', mappedCities);
            return mappedCities;
        });
    }

    function get(id) {

        //var url = apiUrl + 'dummy-data/cities-id.json';
        var url = apiUrl + 'v1/cities/' + id;

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

    function create(city) {

    }

    function update(city) {

    }

    function remove(id) {

    }



    /// mappers /////////

    function mapSend(city) {
        // mappings here - from app to api
        return {
            
        };
    }

    function mapReceive(city) {
        // mappings here - from api to app (use model properties)

        var stations = city.cityStations ? _utils.linq.select(city.cityStations, function (station) {
            station.cityId = city.id;
            return stationRepository.mapReceive(station)
        }) : [];

        return {
            id: city.id,
            name: city.name,
            lat: parseFloat(city.lat),
            lng: parseFloat(city.lng),
            merniStanici: stations,
            zoomLevel: parseInt(city.zoomLevel),
            rectangleBounds: {
                north: parseFloat(city.north),
                south: parseFloat(city.south),
                east: parseFloat(city.east),
                west: parseFloat(city.west)
            }
        };
    }


})());


