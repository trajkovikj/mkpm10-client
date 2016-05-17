"use strict";

finkipm.core.registerRepository('cityRepository',(function () {

    var _utils = finkipm.utils;
    var apiUrl = finkipm.core.config.apiUrl;
    var _promiseCache = {};

    /*var _cache = [
        {
            id : 0,
            name : 'Скопје',
            lat: 41.999218,
            lng: 21.429010,
            merniStanici : [
                {
                    id : 0,
                    description : 'Карпош',
                    lat: 42.006667,
                    lng: 21.386944
                },
                {
                    id : 1,
                    description : 'Центар',
                    lat: 41.9925,
                    lon: 21.423611
                }
            ],
            zoomLevel : 14,
            rectangleBounds : {
                north: 42.040027,
                south: 41.958893,
                east: 21.512438,
                west: 21.335283
            }
        }
    ];*/

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

        getAll : function () {

            var url = apiUrl + 'dummy-data/cities.json';

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
        },

        get : function (id) {

            var url = apiUrl + 'dummy-data/cities-id.json';

            var promise = _promiseCache.hasOwnProperty(url) ? _promiseCache[url] : $.ajax({
                type : 'GET',
                url : url,
                dataType : 'json'
            });

            _promiseCache[url] = _utils.object(promise);

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

        }
    };
})());


