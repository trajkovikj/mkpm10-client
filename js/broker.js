"use strict";

var broker = (function () {

    var _lastRequest;

    /*function initMapForCity(cityId) {

        var city = models.city.getById(cityId);
        googleVariables.map.setCenter({lat: city.lat, lng: city.lng});
        googleVariables.map.setZoom(city.zoomLevel);
    }

    function rectangleResolver(cityId) {
        var rectangle = googleVariables.cityRectangleCache.get(cityId);
        if(rectangle) return rectangle;

        var city = models.city.getById(cityId);
        return googleVariables.cityRectangleCache.add(city);
    }

    function constructSrednaVrednostMapType (request) {

        // da se klonira merenjaIterator za da moze da se vklucat povekje kvadrati
        initMapForCity(request.cityId);
        var rectangle = rectangleResolver(request.cityId);
        requests.getAllAvg(request.cityId, request.year, request.month).done(function (data) {
            merenjaIterator.resetIteratorData(data);
            merenjaPainter.paintSrednaVrednostMapType(rectangle, merenjaIterator.current());
        });
    }

    function constructPoMernaStanicaMapType (request) {

    }

    function constructHeatmapMapType (request) {

    } */

    return {
        constructMap : function (request) {

            if(request.mapType == enums.mapType.SREDNA_VREDNOST.value) {

                // constructSrednaVrednostMapType(request);
                srednaVrednostBroker.constructMap(request);

            } else if (request.mapType == enums.mapType.PO_MERNA_STANICA.value) {

                // constructPoMernaStanicaMapType(request);

            } else if (request.mapType == enums.mapType.HEATMAP.value) {

                // constructHeatmapMapType(request);

            } else {
                // console.log('broker.changeMapContext: Unknown mapType');
                throw 'broker.changeMapContext: Unknown mapType';
            }

            _lastRequest = request;
        },

        playSlider : function()  {
            // vrzi iterator
            // vrzi painter
        },

        pauseSlider : function() {
            // vrzi iterator
            // vrzi painter
        },

        moveSlider : function(position) {
            // vrzi iterator
            // vrzi painter
        }



    };
})();


var srednaVrednostBroker = (function () {

    function initMapForCity(cityId) {

        var city = models.city.getById(cityId);
        googleVariables.map.setCenter({lat: city.lat, lng: city.lng});
        googleVariables.map.setZoom(city.zoomLevel);
    }

    function rectangleResolver(cityId) {
        var rectangle = googleVariables.cityRectangleCache.get(cityId);
        if(rectangle) return rectangle;

        var city = models.city.getById(cityId);
        return googleVariables.cityRectangleCache.add(city);
    }

    return {
        constructMap : function (request) {
            // da se klonira merenjaIterator za da moze da se vklucat povekje kvadrati
            initMapForCity(request.cityId);
            var rectangle = rectangleResolver(request.cityId);
            requests.getAllAvg(request.cityId, request.year, request.month).done(function (data) {
                merenjaIterator.resetIteratorData(data);
                merenjaPainter.paintSrednaVrednostMapType(rectangle, merenjaIterator.current());
            });
        }
    };
})();