"use strict";

finkipm.core.registerModule('srednaVrednostMapTypeModule', function (sandbox) {

    var _toastModule = sandbox.getModule('toastModule');

    var _cityRepository = sandbox.getRepository('cityRepository');
    var initCity;


    function colorResolver(number) {
        if (number <= 50) {
            return '#00FF00';
        } else if (number > 50 && number < 200) {
            return '#FFFF00';
        } else {
            return '#FF0000';
        }
    }


    function init(cityId, callback) {

        initCity = cityId;

        if(cityId !== null && cityId !== undefined) {

            var cityPromise = _cityRepository.get(cityId);

            cityPromise.then(function(city){
                googleVariables.cityRectangleCache.add(city);
                if(callback) callback();
            });

        } else {

            var citiesPromise = _cityRepository.getAll();

            citiesPromise.then(function(city){

                for(var i=0; i < cities.length; i++) {
                    googleVariables.cityRectangleCache.add(cities[i]);
                }
                if(callback) callback();
            });
        }

    }

    function destroy(callback) {
        // destroy all rectangles
        googleVariables.cityRectangleCache.getAll().forEach(function (r) {
            r.setMap(null);
        });
        
        googleVariables.cityRectangleCache.clearCache();

        if(callback) callback();
    }

    function render(cityId, merenje) {

        if(cityId !== null && cityId !== undefined) {
            var rectangle = googleVariables.cityRectangleCache.get(cityId);
            renderRectangle(rectangle, merenje.pmValue);
        } else {
            var cityRectangleList = googleVariables.cityRectangleCache.getAllWithCityId();
            cityRectangleList.forEach(function(cr) {
                var pmValue = merenje[cr.id].pmValue;
                renderRectangle(cr.rectangle, pmValue);
            });
        }
    }

    function renderRectangle(rectangle, pmValue) {

        rectangle.setOptions({
            fillColor : colorResolver(pmValue)
        });

        rectangle.setVisible(true);
    }


    function brokerPublichedNewMeasurementEvent(notification) {

        render(initCity, notification);
    }


    return {

        initListeners : function () {
            sandbox.addListener('brokerModule::avg-change-measurement', brokerPublichedNewMeasurementEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('brokerModule::avg-change-measurement', brokerPublichedNewMeasurementEvent);
        },

        start : function (cityId, callback) {
            this.initListeners();
            init(cityId, callback);
        },

        destroy : function (callback) {
            this.removeListeners();
            destroy(callback);
        }
    };
});

