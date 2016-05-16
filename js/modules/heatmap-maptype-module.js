"use strict";

finkipm.core.registerModule('heatmapMapTypeModule', function (sandbox) {

    var _cityRepository = sandbox.getRepository('cityRepository');

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

        if(cityId !== null && cityId !== undefined) {

            var cityPromise = _cityRepository.get(cityId);

            cityPromise.then(function(city){

                googleVariables.heatmap.create();
                if(callback) callback();
            });
        }

        if(callback) callback();
    }

    function destroy(callback) {

        googleVariables.heatmap.destroy();
        if(callback) callback();
    }

    function render(cityId, merenje) {

    }

    function renderRectangle(rectangle, pmValue) {

    }


    function brokerPublichedNewMeasurementEvent(notification) {

    }


    return {

        initListeners : function () {
            sandbox.addListener('brokerModule::heatmap-change-measurement', brokerPublichedNewMeasurementEvent, this);
        },

        removeListeners : function () {
            sandbox.removeListener('brokerModule::heatmap-change-measurement', brokerPublichedNewMeasurementEvent);
        },

        start : function (cityId, callback) {
            this.initListeners();
            init(cityId, callback);
        },

        destroy : function (callback) {
            this.removeListeners();
            destroy(callback);
        },

        change : function(measurement) {
            render(initCity, notification);
        }
    };
});

