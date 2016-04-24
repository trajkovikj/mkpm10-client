"use strict";


var merenjaIterator = (function () {
    var _index = 0;
    var _requestedMerenja = [];

    function getNextMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        if (_index < _requestedMerenja.length - 1) _index++;
        console.log("Index: " + _index);
        return _requestedMerenja[_index];
    };

    function getPrevMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        if (_index > 0) _index--;
        console.log("Index: " + _index);
        return _requestedMerenja[_index];
    };

    function getCurrentMerenje () {
        if (_requestedMerenja === undefined || _requestedMerenja.length == 0) return;
        return _requestedMerenja[_index];
    };

    return {
        getIndex : function getIndex() { return _index; },
        setIndex : function setIndex(number) { _index = number; },
        getRequestedMerenja : function getIndex() { return _requestedMerenja; },
        setRequestedMerenja : function setIndex(merenja) { _requestedMerenja = merenja; },


        next : function () {

            return  getNextMerenje();

           /* var merenje = getNextMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        prev : function () {

            return getPrevMerenje();

            /*var merenje = getPrevMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        current : function () {

            return getCurrentMerenje();

            /*var merenje = getCurrentMerenje();
            if (merenje === undefined) return;

            merenjaPainter.paintNode(merenje, htmlNode, jsNode);*/
        },
        resetIteratorData : function (data) {
            this.setRequestedMerenja(data);
            this.setIndex(0);
        }
    };
})();

var merenjaPainter = (function () {

    function colorResolver(number) {
        if (number <= 50) {
            return '#00FF00';
        } else if (number > 50 && number < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }

    return {

        paintSrednaVrednostMapType : function (rectangle, pmValue) {
            rectangle.setOptions({
                fillColor : colorResolver(pmValue)
            });
            selectors.pmValueDisplayElement.html(pmValue);
        }
    };

})();


var broker = (function () {

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

    function constructSrednaVrednostMapType (request) {

        // da se klonira merenjaIterator za da moze da se vklucat povekje kvadrati
        initMapForCity(request.cityId);
        var rectangle = rectangleResolver(request.cityId);
        requests.getAllAvg(request.cityId, request.year, request.month).done(function (data) {
            merenjaIterator.resetIteratorData(data);
            merenjaPainter.paintSrednaVrednostMapType(rectangle, merenjaIterator.current().pmValue);
        });
    }

    function constructPoMernaStanicaMapType (request) {

    }

    function constructHeatmapMapType (request) {

    }

    return {
        constructMap : function (request) {

            if(request.mapType == enums.mapType.SREDNA_VREDNOST.value) {

                constructSrednaVrednostMapType(request);

            } else if (request.mapType == enums.mapType.PO_MERNA_STANICA.value) {

                constructPoMernaStanicaMapType(request);

            } else if (request.mapType == enums.mapType.HEATMAP.value) {

                constructHeatmapMapType(request);

            } else {
                // console.log('broker.changeMapContext: Unknown mapType');
                throw 'broker.changeMapContext: Unknown mapType';
            }
        },
        


    };
})();